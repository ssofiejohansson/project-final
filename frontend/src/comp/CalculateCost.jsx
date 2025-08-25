import contributeMessages from "../data/savemoneycontribute.json"
import useSubscriptionStore from "../stores/useSubscriptionStore"

export const CalculateCost = () => {
  const selectedSubSave = useSubscriptionStore((s) => s.selectedSubSave);

   if (!selectedSubSave) {
    return <div>No subscription selected</div>;
  }

  const cost = Number(selectedSubSave.cost ?? 0);

  const messageSelect = contributeMessages.find(
    (message) => 
      selectedSubSave.cost * 12 >= message.spanStart &&
      selectedSubSave.cost * 12 <= message.spanEnd
      )

  return (
    <div>
      You just inactivated or deleted your subscription {selectedSubSave.name} and just saved {cost * 12} 🎉
      <div>
        {messageSelect ? messageSelect.message : "Buy your friends balloons 🎈🎈🎈"} 
      </div>         
     </div>
  );
}