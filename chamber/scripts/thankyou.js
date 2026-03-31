const formValues = new URLSearchParams(window.location.search);
console.log(formValues);

document.querySelector("section").innerHTML = `
<p>Register:</p>
        <dl>
          <dt>First Name:</dt>
          <dd>${formValues.get("firstname")}</dd>

          <dt>Last Name:</dt>
          <dd>${formValues.get("lastname")}</dd>

          <dt>Organization Title:</dt>
          <dd>${formValues.get("organization-title")}</dd>

          <dt>Email:</dt>
          <dd>${formValues.get("email")}</dd>

          <dt>Phone number:</dt>
          <dd>${formValues.get("phone")}</dd>

          <dt>Organization Name:</dt>
          <dd>${formValues.get("organization-name")}</dd>

          <dt>Membership Level:</dt>
          <dd>${formValues.get("level")}</dd>

          <dt>Organization Description:</dt>
          <dd>${formValues.get("description")}</dd>

          <dt>Time:</dt>
          <dd>${formValues.get("timestamp")}</dd>
        </dl>
`;
