import {useMe} from '../hooks/useMe';

export function CoachName() {
    const {data: me, error, isLoading} = useMe();
    const coachName = me?.aiCoachName ?? me?.name;

    return (
        <p className="mb-4 text-sm font-medium text-[#697386]">
            <span className="font-semibold text-[#17202f]">
              {isLoading ? 'AI Coach ...' : error ? 'Unavailable' : coachName}
            </span>
        </p>
    );
}
