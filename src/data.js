export default [
  {
    tag: "input",
    name: "first_name",
    type: "text",
    placeholder: "Only 'Ladna' valid here",
    human_label: "First Name",
    validate: {
      validValue: [
        values => values.first_name === "Ladna",
        "Only 'Ladna' is valid "
      ]
    }
  },
  {
    tag: "input",
    name: "last_name",
    type: "text",
    human_label: "Last Name"
  },
  {
    tag: "input",
    name: "email",
    type: "email",
    human_label: "Email Address",
    validate: {
      required: [values => values.email?.trim(), "email is required"],
      pattern: [
        values => values.email.endsWith("gmail.com"),
        "only gmails allowed here"
      ]
    }
  },
  {
    tag: "input",
    name: "phone_number",
    type: "text",
    human_label: "Phone Number",
    validate: {
      required: [
        values => !!values.last_name,
        "phone number required if no last name"
      ]
    }
  },
  {
    tag: "input",
    name: "job_title",
    type: "text",
    human_label: "Job Title",
    group: "employment",
    required: true,
    maxLength: 20
  },
  {
    tag: "textarea",
    name: "job_description",
    human_label: "Job Description",
    group: "employment"
  },
  {
    tag: "input",
    name: "date_of_birth",
    type: "date",
    human_label: "Date of Birth"
  },
  {
    tag: "input",
    name: "parental_consent",
    type: "checkbox",
    human_label: "Parental Consent",
    group: "legal",
    conditional: {
      name: "date_of_birth",
      show_if: value => {
        const now = new Date();
        return (
          new Date(value) >=
          new Date(now.getFullYear() - 13, now.getMonth(), now.getDate())
        );
      }
    }
  }
];
