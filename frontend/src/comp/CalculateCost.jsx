import contributeMessages from "../data/savemoneycontribute.json"
import useSubscriptionStore from "../stores/useSubscriptionStore"

export const CalculateCost = () => {
  const selectedSubSave = useSubscriptionStore((s) => s.selectedSubSave);

  if (!selectedSubSave) {
    return <div className="text-gray-500">No subscription selected</div>;
  }

  const cost = Number(selectedSubSave.cost ?? 0);
  const messageSelect = contributeMessages.find(
    (message) =>
      selectedSubSave.cost * 12 >= message.spanStart &&
      selectedSubSave.cost * 12 <= message.spanEnd
  );

  return (
    <div className="text-text space-y-2">
      <p>
        You just deleted or deactivated your subscription for{" "}
        <span className="font-semibold">{selectedSubSave.name}</span> and saved{" "}
        <span className="text-main font-bold">{cost * 12}kr 🎉</span>
      </p>
      <p>
        {messageSelect
          ? messageSelect.message
          : "Buy your friends balloons 🎈"}
      </p>
    </div>
  );
};