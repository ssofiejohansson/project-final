import { Button, Card, CardBody, CardHeader, Checkbox, Input, Option, Select, Typography } from "@material-tailwind/react";
import { useState } from "react";

import useSubscriptionStore from "../../stores/useSubscriptionStore";

export const SubscriptionForm = () => {
  const urlAPI = "https://project-final-xhjy.onrender.com/subscriptions";

  const [formData, setFormData] = useState({
    name: "",
    cost: "", 
    freeTrial: false, 
    trialDays: "", 
    reminderDate: "",
    status: "active", 
    category: "Other"  
  }); 

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const setSubscription = useSubscriptionStore((state) => state.setSubscription);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Please fill in subscription name!");
      return;
    }

    if (!formData.cost || parseFloat(formData.cost) <= 0) {
      setError("Please enter a valid cost!");
      return;
    }

    if (!formData.reminderDate) {
      setError("Please select a reminder date!");
      return;
    }

    const newSubscription = {
      ...formData,
      reminderDate: new Date(formData.reminderDate).toISOString(),
      cost: parseFloat(formData.cost),
      trialDays: formData.freeTrial ? parseInt(formData.trialDays) || 0 : 0
    };

    try {
      const response = await fetch(`${urlAPI}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSubscription),
      });

      const data = await response.json();

      if(response.ok) {
        setSuccess(true);
        setError("");
        setSubscription((prev) => [newSubscription, ...prev]);
        
        // Reset form
        setFormData({
          name: "",
          cost: "", 
          freeTrial: false, 
          trialDays: "", 
          reminderDate: "",
          status: "active", 
          category: "Other"  
        });
      } else {
        setError(data.message || "Failed to create subscription");
      }
      
    } catch (error) {
      console.error("Subscription creation error:", error);
      setError("Failed to create subscription. Please try again.");
    }
  };

  return (
    <section className="px-8 py-20 container mx-auto">
      <Typography variant="h5" color="blue-gray">
       Add a subscription
      </Typography>
      <Typography
        variant="small"
        className="text-gray-600 font-normal mt-1"
      >
       Fill in the information below
      </Typography>
      <div className="flex flex-col mt-8">
        <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
             Name
            </Typography>
            <Input
              size="lg"
              placeholder="Netflix"
              labelProps={{
                className: "hidden",
              }}
              onChange={(e) => setFormData({
                ...formData, name: e.target.value
              })}
              type="text"
              name="name"
              id="name"
              value={formData.name}
              required
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
            <Input
              size="lg"
              placeholder="0.00"
              labelProps={{
                className: "hidden",
              }}
              onChange={(e) => setFormData({
                ...formData, cost: e.target.value
              })}
              type="number"
              name="cost"
              id="cost"
              value={formData.cost}
              required
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            /> Cost
            <Checkbox
              size="lg"
              //placeholder="Netflix"
              labelProps={{
                className: "hidden",
              }}
              onChange={(e) => setFormData({
                ...formData, freeTrial: e.target.value
              })}
              type="checkbox"
              checked={isChecked}
              name="freetrial"
              id="freetrial"
              value={formData.freeTrial}              
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
        {/* Ändrat ovanför */}
        </div>
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              I&apos;m
            </Typography>
            <Select
              size="lg"
              labelProps={{
                className: "hidden",
              }}
              className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
            >
              <Option>Male</Option>
              <Option>Female</Option>
            </Select>
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Birth Date
            </Typography>
            <Popover placement="bottom">
              <PopoverHandler>
                <Input
                  size="lg"
                  onChange={() => null}
                  placeholder="Select a Date"
                  value={date ? format(date, "PPP") : ""}
                  labelProps={{
                    className: "hidden",
                  }}
                  className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                />
              </PopoverHandler>
              <PopoverContent>
                <DayPicker
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  showOutsideDays
                  className="border-0"
                  classNames={{
                    caption:
                      "flex justify-center py-2 mb-4 relative items-center",
                    caption_label: "text-sm !font-medium text-gray-900",
                    nav: "flex items-center",
                    nav_button:
                      "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                    nav_button_previous: "absolute left-1.5",
                    nav_button_next: "absolute right-1.5",
                    table: "w-full border-collapse",
                    head_row: "flex !font-medium text-gray-900",
                    head_cell: "m-0.5 w-9 !font-normal text-sm",
                    row: "flex w-full mt-2",
                    cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                    day: "h-9 w-9 p-0 !font-normal",
                    day_range_end: "day-range-end",
                    day_selected:
                      "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                    day_today: "rounded-md bg-gray-200 text-gray-900",
                    day_outside:
                      "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                    day_disabled: "text-gray-500 opacity-50",
                    day_hidden: "invisible",
                  }}
                  components={{
                    IconLeft: ({ ...props }) => (
                      <ChevronLeftIcon
                        {...props}
                        className="h-4 w-4 stroke-2"
                      />
                    ),
                    IconRight: ({ ...props }) => (
                      <ChevronRightIcon
                        {...props}
                        className="h-4 w-4 stroke-2"
                      />
                    ),
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Day
            </Typography>
            <Select
              size="lg"
              labelProps={{
                className: "hidden",
              }}
              className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
            >
              <Option>1</Option>
              <Option>2</Option>
              <Option>3</Option>
              <Option>4</Option>
              <Option>5</Option>
              <Option>6</Option>
              <Option>7</Option>
              <Option>8</Option>
              <Option>9</Option>
              <Option>10</Option>
              <Option>11</Option>
              <Option>12</Option>
              <Option>13</Option>
              <Option>14</Option>
              <Option>15</Option>
              <Option>16</Option>
              <Option>17</Option>
              <Option>18</Option>
              <Option>19</Option>
              <Option>20</Option>
              <Option>21</Option>
              <Option>22</Option>
              <Option>23</Option>
              <Option>24</Option>
              <Option>25</Option>
              <Option>26</Option>
              <Option>27</Option>
              <Option>28</Option>
              <Option>29</Option>
              <Option>30</Option>
            </Select>
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Year
            </Typography>
            <Select
              size="lg"
              labelProps={{
                className: "hidden",
              }}
              className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
            >
              <Option>2022</Option>
              <Option>2021</Option>
              <Option>2020</Option>
            </Select>
          </div>
        </div>
        <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="emma@mail.com"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Confirm Email
            </Typography>
            <Input
              size="lg"
              placeholder="emma@mail.com"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
        </div>
        <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Location
            </Typography>
            <Input
              size="lg"
              placeholder="Florida, USA"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Phone Number
            </Typography>
            <Input
              size="lg"
              placeholder="+123 0123 456 789"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
        </div>
        <div className="flex flex-col items-end gap-4 md:flex-row">
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Language
            </Typography>
            <Input
              size="lg"
              placeholder="Language"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
          <div className="w-full">
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-medium"
            >
              Skills
            </Typography>
            <Input
              size="lg"
              placeholder="Skills"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
            />
          </div>
        </div>
      </div>
    </section>
  );
}