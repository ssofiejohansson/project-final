import {
  Button,
  Card,
  CardBody,
  IconButton,
  Typography,
} from "@material-tailwind/react";


export const Popup = () => {
  return (
    <section>
      <div className="w-full px-4">
        <div className="grid h-screen place-items-center">
          <Card className="max-w-xl">
            <CardBody>
              <div className="flex w-full justify-end">
                <IconButton variant="text">
                  <i className="fas fa-close text-xl"></i>
                </IconButton>
              </div>
              <div className="text-center px-6">
                <Typography
                  color="blue-gray"
                  className="mb-6 mt-10"
                  variant="h4"
                >
                  Welcome to our website!
                </Typography>
                <Typography className="text-[20px] font-normal text-gray-500">
                  Don&apos;t miss out on the latest deals and promotions.
                </Typography>
                <Button size="lg" className="mt-8">
                  join our community
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}