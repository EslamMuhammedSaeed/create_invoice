import { useEffect } from "react";
import { addItemTax, calculateTotals } from "./store/invoiceSlice";
import { useDispatch, useSelector } from "react-redux";
import InvoiceItemTax from "./InvoiceItemTax";
import { useFormContext } from "react-hook-form";

import CustomAccordion from "./CustomAccordion";
function InvoiceItem({ id }) {
  const item = useSelector((state) => state.invoice.items[id]);
  const dispatch = useDispatch();
  const { register } = useFormContext();

  // const watchTotals = watch([
  //   `item.${id}.name`,
  //   `item.${id}.unit`,
  //   `item.${id}.pricePerUnit`,
  //   `item.${id}.quantity`,
  //   `item.${id}.discount`,
  //   `item.${id}.discountAfterTax`,
  //   `item.${id}.taxes`,
  // ]);
  // useEffect(() => {
  //   dispatch(
  //     calculateTotals({
  //       id: id,
  //       name: getValues(`item.${id}.name`),
  //       unit: getValues(`item.${id}.unit`),
  //       quantity: getValues(`item.${id}.quantity`),
  //       pricePerUnit: getValues(`item.${id}.pricePerUnit`),
  //       discount: getValues(`item.${id}.discount`),
  //       taxes: getValues(`item.${id}.taxes`),
  //       discountAfterTax: getValues(`item.${id}.discountAfterTax`),
  //       items: getValues(`item`),
  //     })
  //   );
  // }, [watchTotals]);
  // useEffect(() => {
  //   const subscription = watch((value, { name, type }) => {
  //     const action = {
  //       name: getValues(`item.${id}.name`),
  //       unit: getValues(`item.${id}.unit`),
  //       quantity: getValues(`item.${id}.quantity`),
  //       pricePerUnit: getValues(`item.${id}.pricePerUnit`),
  //       // discount: getValues(`item.${id}.discount`),
  //       // discountAfterTax: getValues(`item.${id}.discountAfterTax`),
  //       id: id,
  //       // taxes: getValues(`item.${id}.taxes`),
  //     };
  //     dispatch(calculateTotals(action));
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watchTotals]);
  return (
    <div className="my-3">
      <div className="input_group_row">
        <div className="outlined-input">
          <input
            type="text"
            placeholder=" "
            defaultValue=""
            {...register(`item.${id}.name`)}
          />
          <label htmlFor="test">Name</label>
        </div>

        <div className="outlined-input">
          <input
            type="text"
            placeholder=" "
            defaultValue=""
            {...register(`item.${id}.unit`)}
          />
          <label htmlFor="test">Unit</label>
        </div>

        <div className="outlined-input">
          <input
            type="text"
            placeholder=" "
            defaultValue={0}
            {...register(`item.${id}.quantity`)}
          />
          <label htmlFor="quantity">Quantity</label>
        </div>
        <div className="outlined-input">
          <input
            type="text"
            placeholder=" "
            defaultValue={0}
            {...register(`item.${id}.pricePerUnit`)}
          />
          <label htmlFor="quantity">Price Per Unit</label>
        </div>
        <div className="outlined-input disabled">
          <input
            type="text"
            placeholder=" "
            // defaultValue={0}
            // value={item.subTotal}
            disabled={true}
            defaultValue={item.subTotal}
            // {...register(`item.${id}.subtotal`)}
          />
          <label htmlFor="subtotal">subtotal</label>
        </div>
      </div>
      <div className="extra_fields">
        <div className="discount_group d-flex w-100">
          {/* <div className="outlined-input">
            <input
              type="text"
              placeholder=" "
              defaultValue=""
              {...register(`item.${id}.name`)}
            />
            <label htmlFor="test">Name</label>
          </div> */}
          <CustomAccordion
            heading={
              <div className="py-2" style={{ width: "85%" }}>
                <div className="outlined-input input_header disabled">
                  <input
                    type="text"
                    placeholder=" "
                    value={item.discountBeforeTax}
                    disabled
                    // {...register(`item.${id}.discountType`)}
                  />
                  <label htmlFor="test">Discount Before Tax (EGP)</label>
                </div>
              </div>
            }
          >
            <div className="input_group_row_discount mb-1">
              <div className="outlined-input">
                <input
                  type="text"
                  placeholder=" "
                  defaultValue="Absolute"
                  {...register(`item.${id}.discountType`)}
                />
                <label htmlFor="test">Type</label>
              </div>

              <div className="outlined-input">
                <input
                  type="text"
                  placeholder=" "
                  defaultValue={0}
                  {...register(`item.${id}.discount`)}
                />
                <label htmlFor="test">Value</label>
              </div>
            </div>
          </CustomAccordion>
        </div>
        <div className="discount_group d-flex w-100">
          <CustomAccordion
            heading={
              <div className="py-2" style={{ width: "85%" }}>
                <div className="outlined-input input_header disabled">
                  <input
                    type="text"
                    placeholder=" "
                    value={item.totalTaxes}
                    disabled
                    // {...register(`item.${id}.discountType`)}
                  />
                  <label htmlFor="test">Total Taxes (EGP)</label>
                </div>
              </div>
            }
            addButton={true}
            onClick={() => {
              dispatch(addItemTax({ itemId: id }));
            }}
          >
            {item.taxes?.map((tax, taxIndex) => {
              return (
                <InvoiceItemTax key={taxIndex} id={taxIndex} itemId={id} />
              );
            })}
          </CustomAccordion>
        </div>
        <div className="discount_group d-flex w-100">
          <CustomAccordion
            heading={
              <div className="py-2" style={{ width: "100%" }}>
                <div className="outlined-input input_header">
                  <input
                    type="text"
                    placeholder=" "
                    defaultValue={0}
                    {...register(`item.${id}.discountAfterTax`)}
                  />
                  <label htmlFor="test">Discount After Tax (EGP)</label>
                </div>
              </div>
            }
            toggle={false}
          ></CustomAccordion>
        </div>
        <div className="discount_after_tax_group d-flex w-100">
          <CustomAccordion
            heading={
              <div className="d-flex flex-column w-100">
                <div className="py-2" style={{ width: "100%" }}>
                  <div className="outlined-input input_header disabled">
                    <input
                      type="text"
                      placeholder=" "
                      value={item.totalAfterDiscount}
                      disabled
                      // {...register(`item.${id}.discountType`)}
                    />
                    <label htmlFor="test">Total After Discount (EGP)</label>
                  </div>
                </div>
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
                <div className="py-2" style={{ width: "100%" }}>
                  <div className="outlined-input input_header disabled">
                    <input
                      type="text"
                      placeholder=" "
                      value={item.totalAfterTax}
                      disabled
                      // {...register(`item.${id}.discountType`)}
                    />
                    <label htmlFor="test">Total After Tax (EGP)</label>
                  </div>
                </div>
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
                <div className="py-2" style={{ width: "100%" }}>
                  <div className="outlined-input input_header disabled">
                    <input
                      type="text"
                      placeholder=" "
                      value={item.total}
                      disabled
                      // {...register(`item.${id}.discountType`)}
                    />
                    <label htmlFor="test">Item Net Total (EGP)</label>
                  </div>
                </div>
              </div>
            }
            toggle={false}
          ></CustomAccordion>
        </div>
      </div>

      {/* <label>name</label>
      <input defaultValue="" {...register(`item.${id}.name`)} />
      <label>unit</label>
      <input defaultValue="" {...register(`item.${id}.unit`)} />
      <label>quantity</label>
      <input defaultValue={0} {...register(`item.${id}.quantity`)} /> */}
      {/* <label>pricePerUnit</label> */}
      {/* <input defaultValue={0} {...register(`item.${id}.pricePerUnit`)} /> */}
      {/* <label>discount</label> */}
      {/* <input defaultValue={0} {...register(`item.${id}.discount`)} /> */}
      {/* <label>tax</label>
      <input defaultValue={0} {...register(`item.${id}.tax`)} /> */}

      {/* <div>
        <button
          onClick={() => {
            dispatch(addItemTax({ itemId: id }));
          }}
        >
          add item
        </button>
      </div>
      {item.taxes.map((tax, taxIndex) => {
        return (
          <InvoiceItemTax
            key={taxIndex}
            itemId={id}
            taxId={taxIndex}
            item={item}
          />
        );
      })} */}

      {/* <label>discount after tax</label>
      <input defaultValue={0} {...register(`item.${id}.discountAfterTax`)} />
      <div>item subtotal : {item.subTotal}</div>
      <div>item total after discount : {item.totalAfterDiscount}</div>
      <div>item total after taxes : {item.totalAfterTax}</div>
      <div>item net total : {item.total}</div> */}
      {/* errors will return when field validation fails  */}
    </div>
  );
}

export default InvoiceItem;
