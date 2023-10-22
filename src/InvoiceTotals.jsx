import { useSelector } from "react-redux";
import CustomAccordion from "./CustomAccordion";
import "./InvoiceTotals.css";
import OutlineInput from "./components/OutlineInput";
function InvoiceTotals() {
  const invoice = useSelector((state) => state.invoice);
  console.log(invoice);
  return (
    <div className="d-flex invoice_totals_wrapper">
      <div className="totals_section col-md-4">hey</div>
      <div className="col-md-4">
        <CustomAccordion
          heading={
            <div className="d-flex flex-column w-100">
              <div className="py-2" style={{ width: "100%" }}>
                <OutlineInput
                  name="subtotatal"
                  label="Subtotal (EGP)"
                  defaultValue={invoice.invoiceSubtotal}
                  disabled={true}
                />
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
                <OutlineInput
                  name="totalDiscount"
                  label="Total Discount (EGP)"
                  defaultValue={invoice.invoiceTotalDiscount}
                  disabled={true}
                />
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
                <OutlineInput
                  name="totalTaxes"
                  label="Total Taxes (EGP)"
                  defaultValue={invoice.invoiceTotalTaxes}
                  disabled={true}
                />
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
                <OutlineInput
                  name="newTotal"
                  label="Net Total (EGP)"
                  defaultValue={invoice.invoiceTotal}
                  disabled={true}
                />
              </div>
            </div>
          }
          toggle={false}
        ></CustomAccordion>
      </div>
    </div>
  );
}

export default InvoiceTotals;
