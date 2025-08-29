import contributeMessages from "../../data/savemoneycontribute.json"
import useSubscriptionStore from "../../stores/useSubscriptionStore"

export const CalculateCost = () => {
  const selectedSubSave = useSubscriptionStore((s) => s.selectedSubSave);

  if (!selectedSubSave) {
    return <div className="text-light">No subscription selected</div>;
  }

  const cost = Number(selectedSubSave.cost ?? 0);
  const messageSelect = contributeMessages.find(
    (message) =>
      cost * 12 >= message.spanStart &&
      cost * 12 <= message.spanEnd
  );

  return (
    <div className="text-text space-y-2">
      <p>
        <span className="text-main font-bold">{cost * 12} kr </span>left to spend this year 🎉
      </p>
      <p>
        {messageSelect?.message || "Donate and save the bees! 🐝"}
      </p>
    </div>
  );
};