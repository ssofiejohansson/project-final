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
   You just deleted your subscription for {selectedSubSave.name} and saved {cost * 12}kr 🎉
      <div>
        {messageSelect ? messageSelect.message : "Buy your friends balloons 🎈🎈🎈"}
      </div>
    </div>
  );
}