
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type JudgeSubmission = {
  id: string;
  category: string;
  status: string;
  submitted_at: string;
};

type Filter = 'all' | 'Food donation' | 'Volunteer application' | 'NGO application';

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

export default function JudgePage() {
  const [records, setRecords] = useState<JudgeSubmission[]>([]);
  const [activeFilter, setActiveFilter] = useState<Filter>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  const loadRecords = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.rpc(
        'get_judge_submissions'
      );

      if (error) throw error;

      setRecords((data ?? []) as JudgeSubmission[]);
      setLastUpdated(new Date().toLocaleTimeString('en-IN'));
    } catch {
      setError('Unable to load the public project dashboard. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRecords();
  }, [loadRecords]);

  const pendingCount = records.filter(
    (record) => record.status === 'pending'
  ).length;

  const completedCount = records.filter(
    (record) =>
      record.status === 'completed' ||
      record.status === 'approved'
  ).length;

  const donationCount = records.filter(
    (record) => record.category === 'Food donation'
  ).length;

  const filteredRecords =
    activeFilter === 'all'
      ? records
      : records.filter((record) => record.category === activeFilter);

  return (
    <main className="min-h-screen bg-ivory-100 px-5 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-terracotta-700">
              FoodBridge · Hackathon Demo
            </p>

            <h1 className="display mt-2 text-4xl text-forest-700">
              Project Dashboard
            </h1>

            <p className="mt-2 text-sm text-ink-700">
              A live, read-only overview of FoodBridge submissions.
            </p>
          </div>

          <button
            onClick={() => void loadRecords()}
            disabled={loading}
            className="rounded-full border border-forest-700 px-5 py-2 text-sm font-semibold text-forest-700 transition hover:bg-forest-700 hover:text-white disabled:opacity-50"
          >
            {loading ? 'Refreshing...' : 'Refresh data'}
          </button>
        </header>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total submissions', value: records.length },
            { label: 'Food donations', value: donationCount },
            { label: 'Awaiting review', value: pendingCount },
            { label: 'Approved / completed', value: completedCount },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-ink-700">{item.label}</p>
              <p className="display mt-2 text-4xl text-forest-700">
                {loading ? '—' : item.value}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-3xl bg-white p-5 shadow-sm sm:p-8">
          <div>
            <h2 className="display text-2xl text-forest-700">
              Submission overview
            </h2>
            <p className="mt-1 text-sm text-ink-700">
              Explore real submissions stored by the FoodBridge platform.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 border-b border-ink-100 pb-4">
            {([
              ['all', 'All submissions'],
              ['Food donation', 'Food donations'],
              ['Volunteer application', 'Volunteers'],
              ['NGO application', 'NGO applications'],
            ] as [Filter, string][]).map(([filter, label]) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeFilter === filter
                    ? 'bg-forest-700 text-white'
                    : 'bg-ivory-100 text-forest-700 hover:bg-ivory-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {error && (
            <div
              role="alert"
              className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
              <button
                onClick={() => void loadRecords()}
                className="ml-2 font-semibold underline"
              >
                Try again
              </button>
            </div>
          )}

          {loading ? (
            <p className="py-12 text-center text-ink-700">
              Loading live submissions...
            </p>
          ) : filteredRecords.length === 0 ? (
            <p className="py-12 text-center text-ink-700">
              No submissions available in this category yet.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {filteredRecords.map((record, index) => (
                <article
                  key={record.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink-100 p-5"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-terracotta-700">
                      Submission {index + 1}
                    </p>
                    <h3 className="mt-1 font-semibold text-forest-700">
                      {record.category}
                    </h3>
                    <p className="mt-2 text-xs text-ink-500">
                      Submitted: {formatDate(record.submitted_at)}
                    </p>
                  </div>

                  <StatusBadge status={record.status} />
                </article>
              ))}
            </div>
          )}

          <p className="mt-6 text-xs text-ink-500">
            {lastUpdated
              ? `Last refreshed at ${lastUpdated}`
              : 'Dashboard data has not been loaded yet.'}
          </p>
        </section>

        <footer className="mt-8 text-center text-xs text-ink-500">
          FoodBridge · Good food deserves a destination, not a dustbin.
          <p className="mt-2">
            Public read-only demonstration. Personal submission details are protected.
          </p>
        </footer>
      </div>
    </main>
  );
}
