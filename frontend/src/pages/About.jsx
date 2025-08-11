import { Footer } from "../comp/layout/Footer";

export const About = () => {
  return (
    <>
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold">About Page</h1>
      </div>
      <div>
        <p>Are you struggling to keep track of your subscriptions?</p>
        <p>Do you keep paying even when you no longer use them?</p>
        <p>Do you sign up for free trials and forget to cancel?</p>

        <h2>Subscribee — your solution!</h2>

        <p>
          Add all your subscriptions in one place and get email notifications from Beeatrice 🐝 
          when a free trial is ending or a new payment period is coming up.
        </p>

        <p>
          Beeatrice 🐝 will also suggest ways you can spend your money more wisely 
          instead of paying for unused subscriptions.
        </p>
      </div>
      <Footer />
    </>
  );
}