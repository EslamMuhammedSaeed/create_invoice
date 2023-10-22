import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    receiverId: '',
    projectName: '',
    invoice_no: '',
    invoiceDate: '',
    deliveryDate: '',
    dueDate: '',
    currency: '',
    remarks: '',

    subTotal: 0,
    // netTotal: 0,
    items: [{
        name: "",
        unit: "",
        quantity: 0,
        pricePerUnit: 0,
        discount: 0,
        taxes: [{
            name: "",
            percentage: 0,
        }],
        totalTaxes: 0,
        discountAfterTax: 0,
        totalAfterDiscount: 0,
        discountBeforeTax: 0,
        totalAfterTax: 0,
        total: 0,
    }],
    // discountTotal: 0,
    // taxTotal: 0,
    invoiceSubtotal: 0,
    invoiceTotalTaxes: 0,
    invoiceTotalDiscount: 0,
    invoiceTotal: 0,
    // register: () => { },
    errors: {}
}

export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        setSubTotal: (state, action) => {
            // console.log(action.payload);
            state.subTotal = action.payload.subTotal;
        },
        updateGeneralInformation: (state, action) => {
            const field = Object.keys(action.payload)[0];
            state[field] = action.payload[field];
        },
        addItem: (state) => {
            state.items.push({
                name: "",
                unit: "",
                quantity: 0,
                pricePerUnit: 0,
                discount: 0,
                taxes: [{
                    name: "",
                    percentage: 0,
                }],
                discountAfterTax: 0,
                totalAfterDiscount: 0,
                totalAfterTax: 0,
                totalTaxes: 0,
                discountBeforeTax: 0,
                invoiceSubtotal: 0,
                invoiceTotalTaxes: 0,
                invoiceTotalDiscount: 0,
                invoiceTotal: 0,
            });
        },
        addItemTax: (state, action) => {
            state.items[action.payload.itemId].taxes.push({
                name: "",
                percentage: 0,
            });
        },
        calculateTotals: (state, action) => {
            console.log(action.payload);

            let invoiceSubtotal = 0;
            let invoiceTotalTaxes = 0;
            let invoiceTotalDiscount = 0;
            let invoiceTotal = 0;
            const itemsObject = action.payload.items?.map((item, index) => {
                const subTotal = Number(item.pricePerUnit) * Number(item.quantity);
                const totalAfterDiscount = subTotal - Number(item.discount);

                let totalTaxes = item.taxes?.reduce((acc, curr) => {
                    return acc + (totalAfterDiscount * (curr.percentage / 100));
                }, 0);

                const totalAfterTax = Number(totalAfterDiscount) + Number(totalTaxes);
                const total = Number(totalAfterTax) - Number(item.discountAfterTax);
                invoiceSubtotal = invoiceSubtotal + subTotal;
                invoiceTotalTaxes = invoiceTotalTaxes + totalTaxes;
                invoiceTotalDiscount = invoiceTotalDiscount + (Number(item.discount) + Number(item.discountAfterTax));
                invoiceTotal = invoiceTotal + total;

                return {
                    name: item.name,
                    unit: item.unit,
                    quantity: Number(item.quantity),
                    pricePerUnit: Number(item.pricePerUnit),
                    discount: Number(item.quantity),
                    taxes: [...item.taxes.map((tax, taxIndex) => {
                        return {
                            percentage: tax.percentage,
                            type: tax.type
                        };
                    })],
                    totalTaxes: Number(totalTaxes),
                    discountAfterTax: Number(item.discountAfterTax),
                    subTotal: subTotal,
                    totalAfterDiscount: totalAfterDiscount,
                    discountBeforeTax: Number(item.discount),
                    totalAfterTax: totalAfterTax,
                    total: total,
                }
            });

            // itemsObject = {...itemsObject,
            //     invoiceSubtotal: 
            // };
            state.items = itemsObject;
            state.invoiceSubtotal = invoiceSubtotal;
            state.invoiceTotalTaxes = invoiceTotalTaxes;
            state.invoiceTotalDiscount = invoiceTotalDiscount;
            state.invoiceTotal = invoiceTotal;


            console.log("sub", invoiceSubtotal);
            console.log("tax", invoiceTotalTaxes);
            console.log("disc", invoiceTotalDiscount);



        },

    },
})

// Action creators are generated for each case reducer function
export const { setSubTotal, updateGeneralInformation, addItem, addItemTax, calculateTotals } = invoiceSlice.actions

export default invoiceSlice.reducer