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
      You just inactivated or deleted your subscription {selectedSub.name} and just saved {cost * 12} 🎉
      <div>
        {messageSelect ? messageSelect.message : "Buy your friends balloons 🎈🎈🎈"} 
      </div>         
     </div>
  );
}