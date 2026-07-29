import useSWR from 'swr';
import {Activity, BadgeCheck, RefreshCw} from 'lucide-react';
import {getApiStatus} from './lib/api';
import {useMe} from "./hooks/useMe";

function App() {
    const {data, error, isLoading, mutate} = useSWR('api-status', getApiStatus);
    const {data: me} = useMe();

    return (
        <main className="min-h-screen bg-[#f7f8fb] text-[#17202f]">
            <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-10 sm:px-8 lg:px-10">
                <header className="max-w-4xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#2f6b4f]">
                        Practice dashboard
                    </p>
                    <h1 className="text-4xl font-semibold tracking-normal text-[#111827] sm:text-5xl lg:text-6xl">
                        {me?.aiCoachName ?? 'AI Coach loading...'}
                    </h1>
                    <p className="mt-5 max-w-3xl text-lg leading-8 text-[#4c5566] sm:text-xl">
                        A focused workspace for tracking readiness, starting mock
                        interview sessions, and checking that the API connection is ready.
                    </p>
                </header>

                <div className="mt-10 grid flex-1 grid-cols-1 gap-6 lg:grid-cols-3">
                    <section className="rounded-lg border border-[#dfe4ec] bg-white p-6 shadow-sm lg:col-span-2">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold text-[#111827]">
                                    Interview plan
                                </h2>
                                <p className="mt-2 max-w-2xl text-base leading-7 text-[#5b6472]">
                                    Build a structured practice loop around question prompts,
                                    answer reviews, and measurable improvement signals.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => void mutate()}
                                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#cbd3df] bg-white text-[#223048] transition hover:bg-[#f0f3f7]"
                                aria-label="Refresh API status"
                                title="Refresh API status"
                            >
                                <RefreshCw className="h-4 w-4" aria-hidden="true"/>
                            </button>
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                            {['Role fit', 'Technical depth', 'Communication'].map((label) => (
                                <div
                                    key={label}
                                    className="rounded-lg border border-[#e3e8ef] bg-[#fbfcfe] p-4"
                                >
                                    <p className="text-sm font-medium text-[#697386]">{label}</p>
                                    <p className="mt-3 text-3xl font-semibold text-[#17202f]">
                                        Ready
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <aside className="rounded-lg border border-[#dfe4ec] bg-white p-6 shadow-sm">
                        <div className="flex items-center gap-3">
              <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[#eaf5ef] text-[#2f6b4f]">
                <Activity className="h-5 w-5" aria-hidden="true"/>
              </span>
                            <div>
                                <h2 className="text-xl font-semibold text-[#111827]">
                                    API status
                                </h2>
                                <p className="text-sm text-[#687284]">Via SWR and /api</p>
                            </div>
                        </div>

                        <div className="mt-8 rounded-lg border border-[#e3e8ef] bg-[#fbfcfe] p-4">

                            <div className="flex items-center gap-3">
                                <BadgeCheck
                                    className="h-5 w-5 shrink-0 text-[#2f6b4f]"
                                    aria-hidden="true"
                                />
                                <p className="text-sm font-medium text-[#4d5868]">
                                    {isLoading
                                        ? 'Checking connection...'
                                        : error
                                            ? 'API unavailable'
                                            : data?.message}
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}

export default App;
