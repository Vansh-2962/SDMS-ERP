export class InvoiceMapper {
    static toRequestPayload(data, sequenceId, docNo) {
        return {
            label: data.label,
            sequence: {
                connect: {
                    id: sequenceId,
                },
            },
            docNo,
            customer: {
                connect: {
                    id: data.customerId,
                },
            },
            ...(data.docDate !== undefined && {
                docDate: data.docDate,
            }),
            dueDate: data.dueDate,
            ...(data.paymentTerms !== undefined && {
                paymentTerms: data.paymentTerms,
            }),
            supplyType: data.supplyType,
            ...(data.placeOfSupply !== undefined && {
                placeOfSupply: data.placeOfSupply,
            }),
            ...(data.reverseCharge !== undefined && {
                reverseCharge: data.reverseCharge,
            }),
            ...(data.transportMode !== undefined && {
                transportMode: data.transportMode,
            }),
            ...(data.vehicleNo !== undefined && {
                vehicleNo: data.vehicleNo,
            }),
            ...(data.ewayNo !== undefined && {
                ewayNo: data.ewayNo,
            }),
            ...(data.deliveryDate !== undefined && {
                deliveryDate: data.deliveryDate,
            }),
            ...(data.notes !== undefined && {
                notes: data.notes,
            }),
            ...(data.terms !== undefined && {
                terms: data.terms,
            }),
            subTotal: data.subTotal,
            ...(data.discount !== undefined && {
                discount: data.discount,
            }),
            ...(data.roundOff !== undefined && {
                roundOff: data.roundOff,
            }),
            taxable: data.taxable,
            igst: data.igst,
            sgst: data.sgst,
            cgst: data.cgst,
            ...(data.billingAddress !== undefined && {
                billingAddress: data.billingAddress,
            }),
            ...(data.shippingAddress !== undefined && {
                shippingAddress: data.shippingAddress,
            }),
            grandTotal: data.grandTotal,
            items: {
                create: data.items.map((item) => ({
                    product: {
                        connect: {
                            id: item.productId,
                        },
                    },
                    hsn: item.hsn,
                    qty: item.qty,
                    rate: item.rate,
                    discPer: item.discPer,
                    gstPer: item.gstPer,
                    amount: item.amount,
                })),
            },
        };
    }
    static toResponse(data) {
        return {
            id: data.id,
            label: data.label,
            docNo: data.docNo,
        };
    }
    static toList(data) {
        return data.map((invoice) => ({
            id: invoice.id,
            docNo: invoice.docNo,
            date: invoice.docDate,
            dueDate: invoice.dueDate,
            customerId: invoice.customerId,
            taxable: invoice.taxable,
            customer: {
                shopName: invoice.customer.shopName,
                gstNumber: invoice.customer.gstNumber,
            },
            gst: {
                igst: invoice.igst,
                cgst: invoice.cgst,
                sgst: invoice.sgst,
            },
            placeOfSupply: invoice.placeOfSupply,
            grandTotal: invoice.grandTotal,
            status: invoice.status,
            label: invoice.label,
        }));
    }
}
//# sourceMappingURL=invoice.mapper.js.map