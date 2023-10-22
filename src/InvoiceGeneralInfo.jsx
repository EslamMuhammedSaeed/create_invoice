// import { useFormContext } from "react-hook-form";
import "./invoiceGeneralInfo.css";
import OutlineInput from "./components/OutlineInput";
import { useDispatch } from "react-redux";
import { useFormContext } from "react-hook-form";
import { updateGeneralInformation } from "./store/invoiceSlice";
import { useEffect } from "react";

// import { useForm } from "react-hook-form";
function InvoiceGeneralInfo() {
  const dispatch = useDispatch();
  const { watch, getValues } = useFormContext();

  const watchGeneralInfo = watch([
    `receiverId`,
    `projectName`,
    `invoiceNo`,
    `invoiceDate`,
    `deliveryDate`,
    `dueDate`,
  ]);
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      const action = {};
      action[name] = getValues(name);
      dispatch(updateGeneralInformation(action));
    });
    return () => subscription.unsubscribe();
  }, [watchGeneralInfo]);
  return (
    <div>
      <div className="mb-4">
        <h4 className="section_header">General Information</h4>
      </div>

      <div className="invoice_info_wrapper">
        <div className="input_group_row mb-4">
          <OutlineInput name="receiverId" label="Receiver" defaultValue="" />
          <OutlineInput
            name="projectName"
            label="Project Name"
            defaultValue=""
          />

          <OutlineInput name="invoiceNo" label="Invoice No." defaultValue="" />
          <OutlineInput name="currency" label="Currency" defaultValue="EGP" />
        </div>

        <div className="input_group_row mb-0">
          <OutlineInput type="date" name="invoiceDate" label="Invoice Date" />
          <OutlineInput type="date" name="deliveryDate" label="Delivery Date" />
          <OutlineInput type="date" name="dueDate" label="Due Date" />
          <OutlineInput type="textarea" name="remarks" label="Remarks" />
        </div>
      </div>
    </div>
  );
}

export default InvoiceGeneralInfo;
