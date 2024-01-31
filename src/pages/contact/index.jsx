import { Form, Formik } from "formik";
import Input from "~/components/input";
import Button from "~/components/button";
import { motion } from "framer-motion";
import { contactSchema } from "~/validations";
import { useMutation } from "react-query";
import { createTicketService } from "~/services/ticket";
import toast from "react-hot-toast";

export default function Contact() {
  const mutation = useMutation({
    mutationFn: (data) => createTicketService(data),
    onSuccess: () => toast.success("Your ticket has been sent."),
    onError: (error) => toast.error(error.data),
  });

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      className="mx-auto p-7 max-w-[577px] bg-secondary rounded-[15px]"
    >
      <h2 className="text-4xl font-extrabold">Contact Us</h2>
      <p className="text-[15px] leading-[17px] my-3.5 font-bold text-[#898989]">
        Use the form below to get in touch with our support team. Please give us
        up to 48 hours to respond to your ticket.
      </p>
      <Formik
        initialValues={{
          title: "",
          email: "",
          inoviceId: "",
          message: "",
        }}
        validationSchema={contactSchema}
        onSubmit={(values, formikHelpers) =>
          mutation.mutate(values, {
            onSuccess: () => formikHelpers.resetForm(),
          })
        }
      >
        <Form className="grid gap-y-[17px]">
          <Input
            name="title"
            label="Title"
            placeholder="e.g Requesting support for a product I purchased"
          />
          <Input
            name="email"
            label="Email"
            placeholder="Enter your email address"
          />
          <Input
            name="inoviceId"
            label="Invoice ID"
            placeholder="Input your 32-digit invoice id (optional)"
          />
          <Input
            component="textarea"
            name="message"
            label="Message"
            placeholder="I'd like to ask about..."
          />
          <Button
            disabled={mutation.isLoading}
            type="submit"
            component="button"
            variant="primary"
          >
            Create Ticket
          </Button>
        </Form>
      </Formik>
    </motion.div>
  );
}
