
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { supabase } from '@/lib/supabase';

type AdminUser = {
  id: string;
  email?: string;
};

type Donation = {
  id: string;
  business_name: string;
  contact_email: string;
  collection_window: string | null;
  status: 'pending' | 'accepted' | 'collected' | 'completed' | 'rejected';
  created_at: string;
};

type Volunteer = {
  id: string;
  name: string;
  area: string | null;
  availability: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
};

type Ngo = {
  id: string;
  organisation_name: string;
  contact_email: string;
  weekly_meal_capacity: number | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
};

type Tab = 'donations' | 'volunteers' | 'ngos';

const donationStatuses = [
  'pending',
  'accepted',
  'collected',
  'completed',
  'rejected',
] as const;

const applicationStatuses = ['pending', 'approved', 'rejected'] as const;

function formatDate(date: string) {
  return new Date(date).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-800',
    accepted: 'bg-blue-100 text-blue-800',
    collected: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
        styles[status] ?? 'bg-gray-100 text-gray-700'
      }`}
    >
      {status}
    </span>
  );
}

export default function AdminPage() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [checkingAdmin, setCheckingAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState<Tab>('donations');
  const [donations, setDonations] = useState<Donation[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [ngos, setNgos] = useState<Ngo[]>([]);

  const [dataLoading, setDataLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) return;

      if (error) setError(error.message);

      setUser(
        data.session?.user
          ? {
              id: data.session.user.id,
              email: data.session.user.email,
            }
          : null
      );

      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      setUser(
        session?.user
          ? {
              id: session.user.id,
              email: session.user.email,
            }
          : null
      );

      setIsAdmin(false);
      setError('');
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    async function verifyAdmin() {
      if (!user) {
        setIsAdmin(false);
        setCheckingAdmin(false);
        return;
      }

      setCheckingAdmin(true);

      const { data, error } = await supabase
        .from('admin_users')
        .select('user_id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (!mounted) return;

      if (error) {
        setError('Unable to verify administrator access.');
        setIsAdmin(false);
      } else {
        setIsAdmin(Boolean(data));
      }

      setCheckingAdmin(false);
    }

    void verifyAdmin();

    return () => {
      mounted = false;
    };
  }, [user]);

  const loadSubmissions = useCallback(async () => {
    setDataLoading(true);
    setError('');

    try {
      const [donationResult, volunteerResult, ngoResult] =
        await Promise.all([
          supabase
            .from('donations')
            .select('*')
            .order('created_at', { ascending: false }),

          supabase
            .from('volunteers')
            .select('*')
            .order('created_at', { ascending: false }),

          supabase
            .from('ngos')
            .select('*')
            .order('created_at', { ascending: false }),
        ]);

      if (donationResult.error) throw donationResult.error;
      if (volunteerResult.error) throw volunteerResult.error;
      if (ngoResult.error) throw ngoResult.error;

      setDonations((donationResult.data ?? []) as Donation[]);
      setVolunteers((volunteerResult.data ?? []) as Volunteer[]);
      setNgos((ngoResult.data ?? []) as Ngo[]);
      setLastUpdated(new Date().toLocaleTimeString('en-IN'));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load submissions.'
      );
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      void loadSubmissions();
    }
  }, [isAdmin, loadSubmissions]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) setError(error.message);

    setPassword('');
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) setError(error.message);
  }

  async function updateStatus(
    table: 'donations' | 'volunteers' | 'ngos',
    id: string,
    status: string
  ) {
    setUpdatingId(id);
    setError('');

    const { error } = await supabase
      .from(table)
      .update({ status })
      .eq('id', id);

    if (error) {
      setError(`Status update failed: ${error.message}`);
    } else {
      await loadSubmissions();
    }

    setUpdatingId(null);
  }

  const pendingCount =
    donations.filter((item) => item.status === 'pending').length +
    volunteers.filter((item) => item.status === 'pending').length +
    ngos.filter((item) => item.status === 'pending').length;

  if (authLoading || checkingAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ivory-100">
        <p className="text-forest-700">Checking access...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ivory-100 px-5 py-12">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-terracotta-700">
            FoodBridge Administration
          </p>

          <h1 className="display mt-4 text-4xl text-forest-700">
            Welcome back.
          </h1>

          <p className="mt-3 text-ink-700">
            Sign in with your administrator account to manage FoodBridge.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label htmlFor="admin-email" className="text-sm font-medium">
                Email address
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-xl border border-ink-300 px-4 py-3"
                placeholder="Admin email"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-xl border border-ink-300 px-4 py-3"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-700">
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary w-full">
              Sign in
            </button>
          </form>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ivory-100 px-5">
        <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
          <h1 className="display text-3xl text-forest-700">
            Access restricted
          </h1>

          <p className="mt-4 text-ink-700">
            This account does not have FoodBridge administrator permissions.
          </p>

          {error && (
            <p role="alert" className="mt-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button onClick={handleLogout} className="btn-primary mt-6">
            Sign out
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory-100 px-5 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-terracotta-700">
              FoodBridge Administration
            </p>

            <h1 className="display mt-2 text-4xl text-forest-700">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-ink-700">
              Signed in as {user.email}
            </p>
          </div>

          <button onClick={handleLogout} className="btn-primary">
            Sign out
          </button>
        </header>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Food donations', value: donations.length },
            { label: 'Volunteers', value: volunteers.length },
            { label: 'NGO applications', value: ngos.length },
            { label: 'Awaiting review', value: pendingCount },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-ink-700">{item.label}</p>
              <p className="display mt-2 text-4xl text-forest-700">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-3xl bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="display text-2xl text-forest-700">
                Manage submissions
              </h2>
              <p className="mt-1 text-sm text-ink-700">
                Review incoming requests and update their progress.
              </p>
            </div>

            <button
              onClick={() => void loadSubmissions()}
              disabled={dataLoading}
              className="rounded-full border border-forest-700 px-5 py-2 text-sm font-semibold text-forest-700 transition hover:bg-forest-700 hover:text-white disabled:opacity-50"
            >
              {dataLoading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 border-b border-ink-100 pb-4">
            {([
              ['donations', 'Food donations'],
              ['volunteers', 'Volunteers'],
              ['ngos', 'NGO applications'],
            ] as const).map(([tab, label]) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeTab === tab
                    ? 'bg-forest-700 text-white'
                    : 'bg-ivory-100 text-forest-700 hover:bg-ivory-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {error && (
            <p
              role="alert"
              className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          {dataLoading ? (
            <p className="py-12 text-center text-ink-700">
              Loading submissions...
            </p>
          ) : (
            <div className="mt-5 space-y-4">
              {activeTab === 'donations' &&
                (donations.length === 0 ? (
                  <p className="py-10 text-center text-ink-700">
                    No food donations have been submitted yet.
                  </p>
                ) : (
                  donations.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-2xl border border-ink-100 p-5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-forest-700">
                            {item.business_name}
                          </h3>
                          <p className="mt-1 text-sm text-ink-700">
                            {item.contact_email}
                          </p>
                          <p className="mt-2 text-sm text-ink-700">
                            Collection: {item.collection_window || 'Not specified'}
                          </p>
                          <p className="mt-2 text-xs text-ink-500">
                            Submitted: {formatDate(item.created_at)}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <StatusBadge status={item.status} />
                          <select
                            aria-label={`Update donation status for ${item.business_name}`}
                            value={item.status}
                            disabled={updatingId === item.id}
                            onChange={(event) =>
                              void updateStatus(
                                'donations',
                                item.id,
                                event.target.value
                              )
                            }
                            className="rounded-xl border border-ink-200 bg-white px-3 py-2 text-sm"
                          >
                            {donationStatuses.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </article>
                  ))
                ))}

              {activeTab === 'volunteers' &&
                (volunteers.length === 0 ? (
                  <p className="py-10 text-center text-ink-700">
                    No volunteer applications have been submitted yet.
                  </p>
                ) : (
                  volunteers.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-2xl border border-ink-100 p-5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-forest-700">
                            {item.name}
                          </h3>
                          <p className="mt-1 text-sm text-ink-700">
                            Area: {item.area || 'Not specified'}
                          </p>
                          <p className="mt-1 text-sm text-ink-700">
                            Availability: {item.availability || 'Not specified'}
                          </p>
                          <p className="mt-2 text-xs text-ink-500">
                            Submitted: {formatDate(item.created_at)}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <StatusBadge status={item.status} />
                          <select
                            aria-label={`Update volunteer status for ${item.name}`}
                            value={item.status}
                            disabled={updatingId === item.id}
                            onChange={(event) =>
                              void updateStatus(
                                'volunteers',
                                item.id,
                                event.target.value
                              )
                            }
                            className="rounded-xl border border-ink-200 bg-white px-3 py-2 text-sm"
                          >
                            {applicationStatuses.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </article>
                  ))
                ))}

              {activeTab === 'ngos' &&
                (ngos.length === 0 ? (
                  <p className="py-10 text-center text-ink-700">
                    No NGO applications have been submitted yet.
                  </p>
                ) : (
                  ngos.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-2xl border border-ink-100 p-5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-forest-700">
                            {item.organisation_name}
                          </h3>
                          <p className="mt-1 text-sm text-ink-700">
                            {item.contact_email}
                          </p>
                          <p className="mt-2 text-sm text-ink-700">
                            Weekly meal capacity:{' '}
                            {item.weekly_meal_capacity ?? 'Not specified'}
                          </p>
                          <p className="mt-2 text-xs text-ink-500">
                            Submitted: {formatDate(item.created_at)}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <StatusBadge status={item.status} />
                          <select
                            aria-label={`Update NGO status for ${item.organisation_name}`}
                            value={item.status}
                            disabled={updatingId === item.id}
                            onChange={(event) =>
                              void updateStatus(
                                'ngos',
                                item.id,
                                event.target.value
                              )
                            }
                            className="rounded-xl border border-ink-200 bg-white px-3 py-2 text-sm"
                          >
                            {applicationStatuses.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </article>
                  ))
                ))}
            </div>
          )}

          <p className="mt-6 text-xs text-ink-500">
            {lastUpdated
              ? `Last refreshed at ${lastUpdated}`
              : 'Submission data has not been loaded yet.'}
          </p>
        </section>

        <footer className="mt-8 text-center text-xs text-ink-500">
          FoodBridge Administration · Manage surplus. Nourish communities.
        </footer>
      </div>
    </main>
  );
}
