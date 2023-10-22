import { useEffect } from "react";
import InvoiceItem from "./InvoiceItem";
import { addItem, calculateTotals } from "./store/invoiceSlice";

import "./invoiceItems.css";
import { MdAddCircleOutline } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";
// import { useFormContext } from "react-hook-form";

function InvoiceItems() {
  //   const [itemsNo, setItemsNo] = useState(1);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.invoice.items);
  const { watch, getValues } = useFormContext();
  const watchItems = watch([`item`]);

  // useEffect(() => {
  //   dispatch(
  //     calculateTotals({
  //       items: getValues(`item`),
  //     })
  //   );
  // }, [watchItems]);
  // console.log(items);
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      let action = {};
      const nameSplit = name.split(".");
      // action[nameSplit[nameSplit.length - 1]] = getValues(name);
      action["id"] = nameSplit[1];
      // action[name] = getValues(name);
      action["items"] = getValues("item");
      console.log(action);
      dispatch(calculateTotals(action));
    });
    return () => subscription.unsubscribe();
  }, [watchItems]);
  return (
    <div className="invoice_items_wrapper">
      <div className="mb-4">
        <h4 className="section_header">Invoice Items</h4>
      </div>
      <div>
        {items.map((item, index) => {
          return <InvoiceItem key={index} id={index} />;
        })}
      </div>
      <div>
        <button
          type="button"
          className="add_item_btn"
          onClick={() => {
            dispatch(addItem());
          }}
        >
          Add Item
          <MdAddCircleOutline style={{ fontSize: "1.4rem" }} />
        </button>
      </div>
    </div>
  );
}

export default InvoiceItems;
