import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals } from "./store/invoiceSlice";
import { useFormContext } from "react-hook-form";

function InvoiceItemTax({ id, itemId }) {
  const { register } = useFormContext();
  const item = useSelector((state) => state.invoice.items[id]);
  // console.log("itemId", itemId);
  // console.log("taxIndex", id);
  //   const watchPercentage = props.watch([
  //     `item.${props.itemId}.taxes.${props.taxId}.percentage`,
  //   ]);
  //   const dispatch = useDispatch();
  //   useEffect(() => {
  //     console.log(props.getValues(`item.${props.itemId}.taxes`));

  //     dispatch(
  //       calculateTotals({
  //         name: props.getValues(`item.${props.itemId}.name`),
  //         unit: props.getValues(`item.${props.itemId}.unit`),
  //         quantity: props.getValues(`item.${props.itemId}.quantity`),
  //         pricePerUnit: props.getValues(`item.${props.itemId}.pricePerUnit`),
  //         discount: props.getValues(`item.${props.itemId}.discount`),
  //         // tax: props.getValues(`item.${props.itemId}.tax`),
  //         discountAfterTax: props.getValues(
  //           `item.${props.itemId}.discountAfterTax`
  //         ),
  //         id: props.itemId,
  //         taxes: props.getValues(`item.${props.itemId}.taxes`),
  //       })
  //     );
  //   }, [watchPercentage]);
  return (
    <div>
      <div className="input_group_row_discount mb-1">
        <div className="outlined-input">
          <input
            type="text"
            placeholder=" "
            defaultValue="Absolute"
            {...register(`item.${itemId}.taxes.${id}.type`)}
          />
          <label htmlFor="test">Type</label>
        </div>

        <div className="outlined-input">
          <input
            type="text"
            placeholder=" "
            defaultValue={0}
            {...register(`item.${itemId}.taxes.${id}.percentage`)}
          />
          <label htmlFor="test">Perc. (%)</label>
        </div>
      </div>
      {item?.taxes?.length != id + 1 && (
        <div
          style={{
            width: "100%",
            height: "1px",
            color: "black",
            marginTop: "10px",
            marginBottom: "15px",
            display: "flex",
            justifyContent: "center",
            background: "#dee2e6",
          }}
        ></div>
      )}
    </div>
  );
}

export default InvoiceItemTax;
