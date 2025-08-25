import contributeMessages from "../data/savemoneycontribute.json"
import useSubscriptionStore from "../stores/useSubscriptionStore"

export const CalculateCost = () => {
  const selectedSub = useSubscriptionStore((s) => s.selectedSubSave);

  if (!selectedSub) {
    return <div>No subscription selected</div>;
  }

  const cost = Number(selectedSub.cost ?? 0);

  const messageSelect = contributeMessages.find(
    (message) =>
      selectedSub.cost * 12 >= message.spanStart &&
      selectedSub.cost * 12 <= message.spanEnd
  )

  return (
    <div>
      You just deleted your subscription for {selectedSub.name} and saved {cost * 12}kr 🎉
      <div>
        {messageSelect ? messageSelect.message : "Buy your friends balloons 🎈🎈🎈"}
      </div>
    </div>
  );
}