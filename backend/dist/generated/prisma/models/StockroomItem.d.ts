import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model StockroomItem
 *
 */
export type StockroomItemModel = runtime.Types.Result.DefaultSelection<Prisma.$StockroomItemPayload>;
export type AggregateStockroomItem = {
    _count: StockroomItemCountAggregateOutputType | null;
    _avg: StockroomItemAvgAggregateOutputType | null;
    _sum: StockroomItemSumAggregateOutputType | null;
    _min: StockroomItemMinAggregateOutputType | null;
    _max: StockroomItemMaxAggregateOutputType | null;
};
export type StockroomItemAvgAggregateOutputType = {
    currentStock: runtime.Decimal | null;
    reorderLevel: runtime.Decimal | null;
    purchasePrice: runtime.Decimal | null;
};
export type StockroomItemSumAggregateOutputType = {
    currentStock: runtime.Decimal | null;
    reorderLevel: runtime.Decimal | null;
    purchasePrice: runtime.Decimal | null;
};
export type StockroomItemMinAggregateOutputType = {
    id: string | null;
    type: $Enums.StockroomItemType | null;
    name: string | null;
    unit: string | null;
    currentStock: runtime.Decimal | null;
    reorderLevel: runtime.Decimal | null;
    purchasePrice: runtime.Decimal | null;
    supplier: string | null;
    lastPurchaseDate: Date | null;
    warehouseLocation: string | null;
    batchNo: string | null;
    notes: string | null;
    deletedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type StockroomItemMaxAggregateOutputType = {
    id: string | null;
    type: $Enums.StockroomItemType | null;
    name: string | null;
    unit: string | null;
    currentStock: runtime.Decimal | null;
    reorderLevel: runtime.Decimal | null;
    purchasePrice: runtime.Decimal | null;
    supplier: string | null;
    lastPurchaseDate: Date | null;
    warehouseLocation: string | null;
    batchNo: string | null;
    notes: string | null;
    deletedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type StockroomItemCountAggregateOutputType = {
    id: number;
    type: number;
    name: number;
    unit: number;
    currentStock: number;
    reorderLevel: number;
    purchasePrice: number;
    supplier: number;
    lastPurchaseDate: number;
    warehouseLocation: number;
    batchNo: number;
    notes: number;
    deletedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type StockroomItemAvgAggregateInputType = {
    currentStock?: true;
    reorderLevel?: true;
    purchasePrice?: true;
};
export type StockroomItemSumAggregateInputType = {
    currentStock?: true;
    reorderLevel?: true;
    purchasePrice?: true;
};
export type StockroomItemMinAggregateInputType = {
    id?: true;
    type?: true;
    name?: true;
    unit?: true;
    currentStock?: true;
    reorderLevel?: true;
    purchasePrice?: true;
    supplier?: true;
    lastPurchaseDate?: true;
    warehouseLocation?: true;
    batchNo?: true;
    notes?: true;
    deletedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type StockroomItemMaxAggregateInputType = {
    id?: true;
    type?: true;
    name?: true;
    unit?: true;
    currentStock?: true;
    reorderLevel?: true;
    purchasePrice?: true;
    supplier?: true;
    lastPurchaseDate?: true;
    warehouseLocation?: true;
    batchNo?: true;
    notes?: true;
    deletedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type StockroomItemCountAggregateInputType = {
    id?: true;
    type?: true;
    name?: true;
    unit?: true;
    currentStock?: true;
    reorderLevel?: true;
    purchasePrice?: true;
    supplier?: true;
    lastPurchaseDate?: true;
    warehouseLocation?: true;
    batchNo?: true;
    notes?: true;
    deletedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type StockroomItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which StockroomItem to aggregate.
     */
    where?: Prisma.StockroomItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StockroomItems to fetch.
     */
    orderBy?: Prisma.StockroomItemOrderByWithRelationInput | Prisma.StockroomItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.StockroomItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StockroomItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StockroomItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned StockroomItems
    **/
    _count?: true | StockroomItemCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: StockroomItemAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: StockroomItemSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: StockroomItemMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: StockroomItemMaxAggregateInputType;
};
export type GetStockroomItemAggregateType<T extends StockroomItemAggregateArgs> = {
    [P in keyof T & keyof AggregateStockroomItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStockroomItem[P]> : Prisma.GetScalarType<T[P], AggregateStockroomItem[P]>;
};
export type StockroomItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StockroomItemWhereInput;
    orderBy?: Prisma.StockroomItemOrderByWithAggregationInput | Prisma.StockroomItemOrderByWithAggregationInput[];
    by: Prisma.StockroomItemScalarFieldEnum[] | Prisma.StockroomItemScalarFieldEnum;
    having?: Prisma.StockroomItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StockroomItemCountAggregateInputType | true;
    _avg?: StockroomItemAvgAggregateInputType;
    _sum?: StockroomItemSumAggregateInputType;
    _min?: StockroomItemMinAggregateInputType;
    _max?: StockroomItemMaxAggregateInputType;
};
export type StockroomItemGroupByOutputType = {
    id: string;
    type: $Enums.StockroomItemType;
    name: string;
    unit: string;
    currentStock: runtime.Decimal;
    reorderLevel: runtime.Decimal;
    purchasePrice: runtime.Decimal;
    supplier: string | null;
    lastPurchaseDate: Date | null;
    warehouseLocation: string | null;
    batchNo: string | null;
    notes: string | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: StockroomItemCountAggregateOutputType | null;
    _avg: StockroomItemAvgAggregateOutputType | null;
    _sum: StockroomItemSumAggregateOutputType | null;
    _min: StockroomItemMinAggregateOutputType | null;
    _max: StockroomItemMaxAggregateOutputType | null;
};
export type GetStockroomItemGroupByPayload<T extends StockroomItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StockroomItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StockroomItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StockroomItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StockroomItemGroupByOutputType[P]>;
}>>;
export type StockroomItemWhereInput = {
    AND?: Prisma.StockroomItemWhereInput | Prisma.StockroomItemWhereInput[];
    OR?: Prisma.StockroomItemWhereInput[];
    NOT?: Prisma.StockroomItemWhereInput | Prisma.StockroomItemWhereInput[];
    id?: Prisma.StringFilter<"StockroomItem"> | string;
    type?: Prisma.EnumStockroomItemTypeFilter<"StockroomItem"> | $Enums.StockroomItemType;
    name?: Prisma.StringFilter<"StockroomItem"> | string;
    unit?: Prisma.StringFilter<"StockroomItem"> | string;
    currentStock?: Prisma.DecimalFilter<"StockroomItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reorderLevel?: Prisma.DecimalFilter<"StockroomItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchasePrice?: Prisma.DecimalFilter<"StockroomItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    supplier?: Prisma.StringNullableFilter<"StockroomItem"> | string | null;
    lastPurchaseDate?: Prisma.DateTimeNullableFilter<"StockroomItem"> | Date | string | null;
    warehouseLocation?: Prisma.StringNullableFilter<"StockroomItem"> | string | null;
    batchNo?: Prisma.StringNullableFilter<"StockroomItem"> | string | null;
    notes?: Prisma.StringNullableFilter<"StockroomItem"> | string | null;
    deletedAt?: Prisma.DateTimeNullableFilter<"StockroomItem"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"StockroomItem"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"StockroomItem"> | Date | string;
    adjustments?: Prisma.InventoryAdjustmentListRelationFilter;
};
export type StockroomItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    unit?: Prisma.SortOrder;
    currentStock?: Prisma.SortOrder;
    reorderLevel?: Prisma.SortOrder;
    purchasePrice?: Prisma.SortOrder;
    supplier?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastPurchaseDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    warehouseLocation?: Prisma.SortOrderInput | Prisma.SortOrder;
    batchNo?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    adjustments?: Prisma.InventoryAdjustmentOrderByRelationAggregateInput;
};
export type StockroomItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.StockroomItemWhereInput | Prisma.StockroomItemWhereInput[];
    OR?: Prisma.StockroomItemWhereInput[];
    NOT?: Prisma.StockroomItemWhereInput | Prisma.StockroomItemWhereInput[];
    type?: Prisma.EnumStockroomItemTypeFilter<"StockroomItem"> | $Enums.StockroomItemType;
    name?: Prisma.StringFilter<"StockroomItem"> | string;
    unit?: Prisma.StringFilter<"StockroomItem"> | string;
    currentStock?: Prisma.DecimalFilter<"StockroomItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reorderLevel?: Prisma.DecimalFilter<"StockroomItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchasePrice?: Prisma.DecimalFilter<"StockroomItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    supplier?: Prisma.StringNullableFilter<"StockroomItem"> | string | null;
    lastPurchaseDate?: Prisma.DateTimeNullableFilter<"StockroomItem"> | Date | string | null;
    warehouseLocation?: Prisma.StringNullableFilter<"StockroomItem"> | string | null;
    batchNo?: Prisma.StringNullableFilter<"StockroomItem"> | string | null;
    notes?: Prisma.StringNullableFilter<"StockroomItem"> | string | null;
    deletedAt?: Prisma.DateTimeNullableFilter<"StockroomItem"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"StockroomItem"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"StockroomItem"> | Date | string;
    adjustments?: Prisma.InventoryAdjustmentListRelationFilter;
}, "id">;
export type StockroomItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    unit?: Prisma.SortOrder;
    currentStock?: Prisma.SortOrder;
    reorderLevel?: Prisma.SortOrder;
    purchasePrice?: Prisma.SortOrder;
    supplier?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastPurchaseDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    warehouseLocation?: Prisma.SortOrderInput | Prisma.SortOrder;
    batchNo?: Prisma.SortOrderInput | Prisma.SortOrder;
    notes?: Prisma.SortOrderInput | Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.StockroomItemCountOrderByAggregateInput;
    _avg?: Prisma.StockroomItemAvgOrderByAggregateInput;
    _max?: Prisma.StockroomItemMaxOrderByAggregateInput;
    _min?: Prisma.StockroomItemMinOrderByAggregateInput;
    _sum?: Prisma.StockroomItemSumOrderByAggregateInput;
};
export type StockroomItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.StockroomItemScalarWhereWithAggregatesInput | Prisma.StockroomItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.StockroomItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StockroomItemScalarWhereWithAggregatesInput | Prisma.StockroomItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"StockroomItem"> | string;
    type?: Prisma.EnumStockroomItemTypeWithAggregatesFilter<"StockroomItem"> | $Enums.StockroomItemType;
    name?: Prisma.StringWithAggregatesFilter<"StockroomItem"> | string;
    unit?: Prisma.StringWithAggregatesFilter<"StockroomItem"> | string;
    currentStock?: Prisma.DecimalWithAggregatesFilter<"StockroomItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reorderLevel?: Prisma.DecimalWithAggregatesFilter<"StockroomItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchasePrice?: Prisma.DecimalWithAggregatesFilter<"StockroomItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    supplier?: Prisma.StringNullableWithAggregatesFilter<"StockroomItem"> | string | null;
    lastPurchaseDate?: Prisma.DateTimeNullableWithAggregatesFilter<"StockroomItem"> | Date | string | null;
    warehouseLocation?: Prisma.StringNullableWithAggregatesFilter<"StockroomItem"> | string | null;
    batchNo?: Prisma.StringNullableWithAggregatesFilter<"StockroomItem"> | string | null;
    notes?: Prisma.StringNullableWithAggregatesFilter<"StockroomItem"> | string | null;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"StockroomItem"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"StockroomItem"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"StockroomItem"> | Date | string;
};
export type StockroomItemCreateInput = {
    id?: string;
    type: $Enums.StockroomItemType;
    name: string;
    unit: string;
    currentStock?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reorderLevel?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchasePrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    supplier?: string | null;
    lastPurchaseDate?: Date | string | null;
    warehouseLocation?: string | null;
    batchNo?: string | null;
    notes?: string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    adjustments?: Prisma.InventoryAdjustmentCreateNestedManyWithoutStockroomItemInput;
};
export type StockroomItemUncheckedCreateInput = {
    id?: string;
    type: $Enums.StockroomItemType;
    name: string;
    unit: string;
    currentStock?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reorderLevel?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchasePrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    supplier?: string | null;
    lastPurchaseDate?: Date | string | null;
    warehouseLocation?: string | null;
    batchNo?: string | null;
    notes?: string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    adjustments?: Prisma.InventoryAdjustmentUncheckedCreateNestedManyWithoutStockroomItemInput;
};
export type StockroomItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockroomItemTypeFieldUpdateOperationsInput | $Enums.StockroomItemType;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    unit?: Prisma.StringFieldUpdateOperationsInput | string;
    currentStock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reorderLevel?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchasePrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastPurchaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    warehouseLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    adjustments?: Prisma.InventoryAdjustmentUpdateManyWithoutStockroomItemNestedInput;
};
export type StockroomItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockroomItemTypeFieldUpdateOperationsInput | $Enums.StockroomItemType;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    unit?: Prisma.StringFieldUpdateOperationsInput | string;
    currentStock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reorderLevel?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchasePrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastPurchaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    warehouseLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    adjustments?: Prisma.InventoryAdjustmentUncheckedUpdateManyWithoutStockroomItemNestedInput;
};
export type StockroomItemCreateManyInput = {
    id?: string;
    type: $Enums.StockroomItemType;
    name: string;
    unit: string;
    currentStock?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reorderLevel?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchasePrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    supplier?: string | null;
    lastPurchaseDate?: Date | string | null;
    warehouseLocation?: string | null;
    batchNo?: string | null;
    notes?: string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StockroomItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockroomItemTypeFieldUpdateOperationsInput | $Enums.StockroomItemType;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    unit?: Prisma.StringFieldUpdateOperationsInput | string;
    currentStock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reorderLevel?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchasePrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastPurchaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    warehouseLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockroomItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockroomItemTypeFieldUpdateOperationsInput | $Enums.StockroomItemType;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    unit?: Prisma.StringFieldUpdateOperationsInput | string;
    currentStock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reorderLevel?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchasePrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastPurchaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    warehouseLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockroomItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    unit?: Prisma.SortOrder;
    currentStock?: Prisma.SortOrder;
    reorderLevel?: Prisma.SortOrder;
    purchasePrice?: Prisma.SortOrder;
    supplier?: Prisma.SortOrder;
    lastPurchaseDate?: Prisma.SortOrder;
    warehouseLocation?: Prisma.SortOrder;
    batchNo?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StockroomItemAvgOrderByAggregateInput = {
    currentStock?: Prisma.SortOrder;
    reorderLevel?: Prisma.SortOrder;
    purchasePrice?: Prisma.SortOrder;
};
export type StockroomItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    unit?: Prisma.SortOrder;
    currentStock?: Prisma.SortOrder;
    reorderLevel?: Prisma.SortOrder;
    purchasePrice?: Prisma.SortOrder;
    supplier?: Prisma.SortOrder;
    lastPurchaseDate?: Prisma.SortOrder;
    warehouseLocation?: Prisma.SortOrder;
    batchNo?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StockroomItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    unit?: Prisma.SortOrder;
    currentStock?: Prisma.SortOrder;
    reorderLevel?: Prisma.SortOrder;
    purchasePrice?: Prisma.SortOrder;
    supplier?: Prisma.SortOrder;
    lastPurchaseDate?: Prisma.SortOrder;
    warehouseLocation?: Prisma.SortOrder;
    batchNo?: Prisma.SortOrder;
    notes?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type StockroomItemSumOrderByAggregateInput = {
    currentStock?: Prisma.SortOrder;
    reorderLevel?: Prisma.SortOrder;
    purchasePrice?: Prisma.SortOrder;
};
export type StockroomItemNullableScalarRelationFilter = {
    is?: Prisma.StockroomItemWhereInput | null;
    isNot?: Prisma.StockroomItemWhereInput | null;
};
export type EnumStockroomItemTypeFieldUpdateOperationsInput = {
    set?: $Enums.StockroomItemType;
};
export type StockroomItemCreateNestedOneWithoutAdjustmentsInput = {
    create?: Prisma.XOR<Prisma.StockroomItemCreateWithoutAdjustmentsInput, Prisma.StockroomItemUncheckedCreateWithoutAdjustmentsInput>;
    connectOrCreate?: Prisma.StockroomItemCreateOrConnectWithoutAdjustmentsInput;
    connect?: Prisma.StockroomItemWhereUniqueInput;
};
export type StockroomItemUpdateOneWithoutAdjustmentsNestedInput = {
    create?: Prisma.XOR<Prisma.StockroomItemCreateWithoutAdjustmentsInput, Prisma.StockroomItemUncheckedCreateWithoutAdjustmentsInput>;
    connectOrCreate?: Prisma.StockroomItemCreateOrConnectWithoutAdjustmentsInput;
    upsert?: Prisma.StockroomItemUpsertWithoutAdjustmentsInput;
    disconnect?: Prisma.StockroomItemWhereInput | boolean;
    delete?: Prisma.StockroomItemWhereInput | boolean;
    connect?: Prisma.StockroomItemWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.StockroomItemUpdateToOneWithWhereWithoutAdjustmentsInput, Prisma.StockroomItemUpdateWithoutAdjustmentsInput>, Prisma.StockroomItemUncheckedUpdateWithoutAdjustmentsInput>;
};
export type StockroomItemCreateWithoutAdjustmentsInput = {
    id?: string;
    type: $Enums.StockroomItemType;
    name: string;
    unit: string;
    currentStock?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reorderLevel?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchasePrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    supplier?: string | null;
    lastPurchaseDate?: Date | string | null;
    warehouseLocation?: string | null;
    batchNo?: string | null;
    notes?: string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StockroomItemUncheckedCreateWithoutAdjustmentsInput = {
    id?: string;
    type: $Enums.StockroomItemType;
    name: string;
    unit: string;
    currentStock?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    reorderLevel?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchasePrice?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    supplier?: string | null;
    lastPurchaseDate?: Date | string | null;
    warehouseLocation?: string | null;
    batchNo?: string | null;
    notes?: string | null;
    deletedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type StockroomItemCreateOrConnectWithoutAdjustmentsInput = {
    where: Prisma.StockroomItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.StockroomItemCreateWithoutAdjustmentsInput, Prisma.StockroomItemUncheckedCreateWithoutAdjustmentsInput>;
};
export type StockroomItemUpsertWithoutAdjustmentsInput = {
    update: Prisma.XOR<Prisma.StockroomItemUpdateWithoutAdjustmentsInput, Prisma.StockroomItemUncheckedUpdateWithoutAdjustmentsInput>;
    create: Prisma.XOR<Prisma.StockroomItemCreateWithoutAdjustmentsInput, Prisma.StockroomItemUncheckedCreateWithoutAdjustmentsInput>;
    where?: Prisma.StockroomItemWhereInput;
};
export type StockroomItemUpdateToOneWithWhereWithoutAdjustmentsInput = {
    where?: Prisma.StockroomItemWhereInput;
    data: Prisma.XOR<Prisma.StockroomItemUpdateWithoutAdjustmentsInput, Prisma.StockroomItemUncheckedUpdateWithoutAdjustmentsInput>;
};
export type StockroomItemUpdateWithoutAdjustmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockroomItemTypeFieldUpdateOperationsInput | $Enums.StockroomItemType;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    unit?: Prisma.StringFieldUpdateOperationsInput | string;
    currentStock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reorderLevel?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchasePrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastPurchaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    warehouseLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StockroomItemUncheckedUpdateWithoutAdjustmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumStockroomItemTypeFieldUpdateOperationsInput | $Enums.StockroomItemType;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    unit?: Prisma.StringFieldUpdateOperationsInput | string;
    currentStock?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    reorderLevel?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    purchasePrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    supplier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastPurchaseDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    warehouseLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    batchNo?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    notes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type StockroomItemCountOutputType
 */
export type StockroomItemCountOutputType = {
    adjustments: number;
};
export type StockroomItemCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    adjustments?: boolean | StockroomItemCountOutputTypeCountAdjustmentsArgs;
};
/**
 * StockroomItemCountOutputType without action
 */
export type StockroomItemCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockroomItemCountOutputType
     */
    select?: Prisma.StockroomItemCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * StockroomItemCountOutputType without action
 */
export type StockroomItemCountOutputTypeCountAdjustmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.InventoryAdjustmentWhereInput;
};
export type StockroomItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    name?: boolean;
    unit?: boolean;
    currentStock?: boolean;
    reorderLevel?: boolean;
    purchasePrice?: boolean;
    supplier?: boolean;
    lastPurchaseDate?: boolean;
    warehouseLocation?: boolean;
    batchNo?: boolean;
    notes?: boolean;
    deletedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    adjustments?: boolean | Prisma.StockroomItem$adjustmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.StockroomItemCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["stockroomItem"]>;
export type StockroomItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    name?: boolean;
    unit?: boolean;
    currentStock?: boolean;
    reorderLevel?: boolean;
    purchasePrice?: boolean;
    supplier?: boolean;
    lastPurchaseDate?: boolean;
    warehouseLocation?: boolean;
    batchNo?: boolean;
    notes?: boolean;
    deletedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["stockroomItem"]>;
export type StockroomItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    name?: boolean;
    unit?: boolean;
    currentStock?: boolean;
    reorderLevel?: boolean;
    purchasePrice?: boolean;
    supplier?: boolean;
    lastPurchaseDate?: boolean;
    warehouseLocation?: boolean;
    batchNo?: boolean;
    notes?: boolean;
    deletedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["stockroomItem"]>;
export type StockroomItemSelectScalar = {
    id?: boolean;
    type?: boolean;
    name?: boolean;
    unit?: boolean;
    currentStock?: boolean;
    reorderLevel?: boolean;
    purchasePrice?: boolean;
    supplier?: boolean;
    lastPurchaseDate?: boolean;
    warehouseLocation?: boolean;
    batchNo?: boolean;
    notes?: boolean;
    deletedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type StockroomItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "type" | "name" | "unit" | "currentStock" | "reorderLevel" | "purchasePrice" | "supplier" | "lastPurchaseDate" | "warehouseLocation" | "batchNo" | "notes" | "deletedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["stockroomItem"]>;
export type StockroomItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    adjustments?: boolean | Prisma.StockroomItem$adjustmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.StockroomItemCountOutputTypeDefaultArgs<ExtArgs>;
};
export type StockroomItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type StockroomItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $StockroomItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StockroomItem";
    objects: {
        adjustments: Prisma.$InventoryAdjustmentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        type: $Enums.StockroomItemType;
        name: string;
        unit: string;
        currentStock: runtime.Decimal;
        reorderLevel: runtime.Decimal;
        purchasePrice: runtime.Decimal;
        supplier: string | null;
        lastPurchaseDate: Date | null;
        warehouseLocation: string | null;
        batchNo: string | null;
        notes: string | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["stockroomItem"]>;
    composites: {};
};
export type StockroomItemGetPayload<S extends boolean | null | undefined | StockroomItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StockroomItemPayload, S>;
export type StockroomItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StockroomItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StockroomItemCountAggregateInputType | true;
};
export interface StockroomItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['StockroomItem'];
        meta: {
            name: 'StockroomItem';
        };
    };
    /**
     * Find zero or one StockroomItem that matches the filter.
     * @param {StockroomItemFindUniqueArgs} args - Arguments to find a StockroomItem
     * @example
     * // Get one StockroomItem
     * const stockroomItem = await prisma.stockroomItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockroomItemFindUniqueArgs>(args: Prisma.SelectSubset<T, StockroomItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StockroomItemClient<runtime.Types.Result.GetResult<Prisma.$StockroomItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one StockroomItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StockroomItemFindUniqueOrThrowArgs} args - Arguments to find a StockroomItem
     * @example
     * // Get one StockroomItem
     * const stockroomItem = await prisma.stockroomItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockroomItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StockroomItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StockroomItemClient<runtime.Types.Result.GetResult<Prisma.$StockroomItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first StockroomItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockroomItemFindFirstArgs} args - Arguments to find a StockroomItem
     * @example
     * // Get one StockroomItem
     * const stockroomItem = await prisma.stockroomItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockroomItemFindFirstArgs>(args?: Prisma.SelectSubset<T, StockroomItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__StockroomItemClient<runtime.Types.Result.GetResult<Prisma.$StockroomItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first StockroomItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockroomItemFindFirstOrThrowArgs} args - Arguments to find a StockroomItem
     * @example
     * // Get one StockroomItem
     * const stockroomItem = await prisma.stockroomItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockroomItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StockroomItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StockroomItemClient<runtime.Types.Result.GetResult<Prisma.$StockroomItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more StockroomItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockroomItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StockroomItems
     * const stockroomItems = await prisma.stockroomItem.findMany()
     *
     * // Get first 10 StockroomItems
     * const stockroomItems = await prisma.stockroomItem.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const stockroomItemWithIdOnly = await prisma.stockroomItem.findMany({ select: { id: true } })
     *
     */
    findMany<T extends StockroomItemFindManyArgs>(args?: Prisma.SelectSubset<T, StockroomItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockroomItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a StockroomItem.
     * @param {StockroomItemCreateArgs} args - Arguments to create a StockroomItem.
     * @example
     * // Create one StockroomItem
     * const StockroomItem = await prisma.stockroomItem.create({
     *   data: {
     *     // ... data to create a StockroomItem
     *   }
     * })
     *
     */
    create<T extends StockroomItemCreateArgs>(args: Prisma.SelectSubset<T, StockroomItemCreateArgs<ExtArgs>>): Prisma.Prisma__StockroomItemClient<runtime.Types.Result.GetResult<Prisma.$StockroomItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many StockroomItems.
     * @param {StockroomItemCreateManyArgs} args - Arguments to create many StockroomItems.
     * @example
     * // Create many StockroomItems
     * const stockroomItem = await prisma.stockroomItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends StockroomItemCreateManyArgs>(args?: Prisma.SelectSubset<T, StockroomItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many StockroomItems and returns the data saved in the database.
     * @param {StockroomItemCreateManyAndReturnArgs} args - Arguments to create many StockroomItems.
     * @example
     * // Create many StockroomItems
     * const stockroomItem = await prisma.stockroomItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many StockroomItems and only return the `id`
     * const stockroomItemWithIdOnly = await prisma.stockroomItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends StockroomItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StockroomItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockroomItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a StockroomItem.
     * @param {StockroomItemDeleteArgs} args - Arguments to delete one StockroomItem.
     * @example
     * // Delete one StockroomItem
     * const StockroomItem = await prisma.stockroomItem.delete({
     *   where: {
     *     // ... filter to delete one StockroomItem
     *   }
     * })
     *
     */
    delete<T extends StockroomItemDeleteArgs>(args: Prisma.SelectSubset<T, StockroomItemDeleteArgs<ExtArgs>>): Prisma.Prisma__StockroomItemClient<runtime.Types.Result.GetResult<Prisma.$StockroomItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one StockroomItem.
     * @param {StockroomItemUpdateArgs} args - Arguments to update one StockroomItem.
     * @example
     * // Update one StockroomItem
     * const stockroomItem = await prisma.stockroomItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends StockroomItemUpdateArgs>(args: Prisma.SelectSubset<T, StockroomItemUpdateArgs<ExtArgs>>): Prisma.Prisma__StockroomItemClient<runtime.Types.Result.GetResult<Prisma.$StockroomItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more StockroomItems.
     * @param {StockroomItemDeleteManyArgs} args - Arguments to filter StockroomItems to delete.
     * @example
     * // Delete a few StockroomItems
     * const { count } = await prisma.stockroomItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends StockroomItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, StockroomItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more StockroomItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockroomItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StockroomItems
     * const stockroomItem = await prisma.stockroomItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends StockroomItemUpdateManyArgs>(args: Prisma.SelectSubset<T, StockroomItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more StockroomItems and returns the data updated in the database.
     * @param {StockroomItemUpdateManyAndReturnArgs} args - Arguments to update many StockroomItems.
     * @example
     * // Update many StockroomItems
     * const stockroomItem = await prisma.stockroomItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more StockroomItems and only return the `id`
     * const stockroomItemWithIdOnly = await prisma.stockroomItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends StockroomItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StockroomItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StockroomItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one StockroomItem.
     * @param {StockroomItemUpsertArgs} args - Arguments to update or create a StockroomItem.
     * @example
     * // Update or create a StockroomItem
     * const stockroomItem = await prisma.stockroomItem.upsert({
     *   create: {
     *     // ... data to create a StockroomItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StockroomItem we want to update
     *   }
     * })
     */
    upsert<T extends StockroomItemUpsertArgs>(args: Prisma.SelectSubset<T, StockroomItemUpsertArgs<ExtArgs>>): Prisma.Prisma__StockroomItemClient<runtime.Types.Result.GetResult<Prisma.$StockroomItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of StockroomItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockroomItemCountArgs} args - Arguments to filter StockroomItems to count.
     * @example
     * // Count the number of StockroomItems
     * const count = await prisma.stockroomItem.count({
     *   where: {
     *     // ... the filter for the StockroomItems we want to count
     *   }
     * })
    **/
    count<T extends StockroomItemCountArgs>(args?: Prisma.Subset<T, StockroomItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StockroomItemCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a StockroomItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockroomItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StockroomItemAggregateArgs>(args: Prisma.Subset<T, StockroomItemAggregateArgs>): Prisma.PrismaPromise<GetStockroomItemAggregateType<T>>;
    /**
     * Group by StockroomItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockroomItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends StockroomItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StockroomItemGroupByArgs['orderBy'];
    } : {
        orderBy?: StockroomItemGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StockroomItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockroomItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the StockroomItem model
     */
    readonly fields: StockroomItemFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for StockroomItem.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__StockroomItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    adjustments<T extends Prisma.StockroomItem$adjustmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.StockroomItem$adjustmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$InventoryAdjustmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the StockroomItem model
 */
export interface StockroomItemFieldRefs {
    readonly id: Prisma.FieldRef<"StockroomItem", 'String'>;
    readonly type: Prisma.FieldRef<"StockroomItem", 'StockroomItemType'>;
    readonly name: Prisma.FieldRef<"StockroomItem", 'String'>;
    readonly unit: Prisma.FieldRef<"StockroomItem", 'String'>;
    readonly currentStock: Prisma.FieldRef<"StockroomItem", 'Decimal'>;
    readonly reorderLevel: Prisma.FieldRef<"StockroomItem", 'Decimal'>;
    readonly purchasePrice: Prisma.FieldRef<"StockroomItem", 'Decimal'>;
    readonly supplier: Prisma.FieldRef<"StockroomItem", 'String'>;
    readonly lastPurchaseDate: Prisma.FieldRef<"StockroomItem", 'DateTime'>;
    readonly warehouseLocation: Prisma.FieldRef<"StockroomItem", 'String'>;
    readonly batchNo: Prisma.FieldRef<"StockroomItem", 'String'>;
    readonly notes: Prisma.FieldRef<"StockroomItem", 'String'>;
    readonly deletedAt: Prisma.FieldRef<"StockroomItem", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"StockroomItem", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"StockroomItem", 'DateTime'>;
}
/**
 * StockroomItem findUnique
 */
export type StockroomItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockroomItem
     */
    select?: Prisma.StockroomItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockroomItem
     */
    omit?: Prisma.StockroomItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockroomItemInclude<ExtArgs> | null;
    /**
     * Filter, which StockroomItem to fetch.
     */
    where: Prisma.StockroomItemWhereUniqueInput;
};
/**
 * StockroomItem findUniqueOrThrow
 */
export type StockroomItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockroomItem
     */
    select?: Prisma.StockroomItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockroomItem
     */
    omit?: Prisma.StockroomItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockroomItemInclude<ExtArgs> | null;
    /**
     * Filter, which StockroomItem to fetch.
     */
    where: Prisma.StockroomItemWhereUniqueInput;
};
/**
 * StockroomItem findFirst
 */
export type StockroomItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockroomItem
     */
    select?: Prisma.StockroomItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockroomItem
     */
    omit?: Prisma.StockroomItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockroomItemInclude<ExtArgs> | null;
    /**
     * Filter, which StockroomItem to fetch.
     */
    where?: Prisma.StockroomItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StockroomItems to fetch.
     */
    orderBy?: Prisma.StockroomItemOrderByWithRelationInput | Prisma.StockroomItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for StockroomItems.
     */
    cursor?: Prisma.StockroomItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StockroomItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StockroomItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StockroomItems.
     */
    distinct?: Prisma.StockroomItemScalarFieldEnum | Prisma.StockroomItemScalarFieldEnum[];
};
/**
 * StockroomItem findFirstOrThrow
 */
export type StockroomItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockroomItem
     */
    select?: Prisma.StockroomItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockroomItem
     */
    omit?: Prisma.StockroomItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockroomItemInclude<ExtArgs> | null;
    /**
     * Filter, which StockroomItem to fetch.
     */
    where?: Prisma.StockroomItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StockroomItems to fetch.
     */
    orderBy?: Prisma.StockroomItemOrderByWithRelationInput | Prisma.StockroomItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for StockroomItems.
     */
    cursor?: Prisma.StockroomItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StockroomItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StockroomItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StockroomItems.
     */
    distinct?: Prisma.StockroomItemScalarFieldEnum | Prisma.StockroomItemScalarFieldEnum[];
};
/**
 * StockroomItem findMany
 */
export type StockroomItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockroomItem
     */
    select?: Prisma.StockroomItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockroomItem
     */
    omit?: Prisma.StockroomItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockroomItemInclude<ExtArgs> | null;
    /**
     * Filter, which StockroomItems to fetch.
     */
    where?: Prisma.StockroomItemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StockroomItems to fetch.
     */
    orderBy?: Prisma.StockroomItemOrderByWithRelationInput | Prisma.StockroomItemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing StockroomItems.
     */
    cursor?: Prisma.StockroomItemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StockroomItems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StockroomItems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StockroomItems.
     */
    distinct?: Prisma.StockroomItemScalarFieldEnum | Prisma.StockroomItemScalarFieldEnum[];
};
/**
 * StockroomItem create
 */
export type StockroomItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockroomItem
     */
    select?: Prisma.StockroomItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockroomItem
     */
    omit?: Prisma.StockroomItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockroomItemInclude<ExtArgs> | null;
    /**
     * The data needed to create a StockroomItem.
     */
    data: Prisma.XOR<Prisma.StockroomItemCreateInput, Prisma.StockroomItemUncheckedCreateInput>;
};
/**
 * StockroomItem createMany
 */
export type StockroomItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many StockroomItems.
     */
    data: Prisma.StockroomItemCreateManyInput | Prisma.StockroomItemCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * StockroomItem createManyAndReturn
 */
export type StockroomItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockroomItem
     */
    select?: Prisma.StockroomItemSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the StockroomItem
     */
    omit?: Prisma.StockroomItemOmit<ExtArgs> | null;
    /**
     * The data used to create many StockroomItems.
     */
    data: Prisma.StockroomItemCreateManyInput | Prisma.StockroomItemCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * StockroomItem update
 */
export type StockroomItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockroomItem
     */
    select?: Prisma.StockroomItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockroomItem
     */
    omit?: Prisma.StockroomItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockroomItemInclude<ExtArgs> | null;
    /**
     * The data needed to update a StockroomItem.
     */
    data: Prisma.XOR<Prisma.StockroomItemUpdateInput, Prisma.StockroomItemUncheckedUpdateInput>;
    /**
     * Choose, which StockroomItem to update.
     */
    where: Prisma.StockroomItemWhereUniqueInput;
};
/**
 * StockroomItem updateMany
 */
export type StockroomItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update StockroomItems.
     */
    data: Prisma.XOR<Prisma.StockroomItemUpdateManyMutationInput, Prisma.StockroomItemUncheckedUpdateManyInput>;
    /**
     * Filter which StockroomItems to update
     */
    where?: Prisma.StockroomItemWhereInput;
    /**
     * Limit how many StockroomItems to update.
     */
    limit?: number;
};
/**
 * StockroomItem updateManyAndReturn
 */
export type StockroomItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockroomItem
     */
    select?: Prisma.StockroomItemSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the StockroomItem
     */
    omit?: Prisma.StockroomItemOmit<ExtArgs> | null;
    /**
     * The data used to update StockroomItems.
     */
    data: Prisma.XOR<Prisma.StockroomItemUpdateManyMutationInput, Prisma.StockroomItemUncheckedUpdateManyInput>;
    /**
     * Filter which StockroomItems to update
     */
    where?: Prisma.StockroomItemWhereInput;
    /**
     * Limit how many StockroomItems to update.
     */
    limit?: number;
};
/**
 * StockroomItem upsert
 */
export type StockroomItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockroomItem
     */
    select?: Prisma.StockroomItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockroomItem
     */
    omit?: Prisma.StockroomItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockroomItemInclude<ExtArgs> | null;
    /**
     * The filter to search for the StockroomItem to update in case it exists.
     */
    where: Prisma.StockroomItemWhereUniqueInput;
    /**
     * In case the StockroomItem found by the `where` argument doesn't exist, create a new StockroomItem with this data.
     */
    create: Prisma.XOR<Prisma.StockroomItemCreateInput, Prisma.StockroomItemUncheckedCreateInput>;
    /**
     * In case the StockroomItem was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.StockroomItemUpdateInput, Prisma.StockroomItemUncheckedUpdateInput>;
};
/**
 * StockroomItem delete
 */
export type StockroomItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockroomItem
     */
    select?: Prisma.StockroomItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockroomItem
     */
    omit?: Prisma.StockroomItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockroomItemInclude<ExtArgs> | null;
    /**
     * Filter which StockroomItem to delete.
     */
    where: Prisma.StockroomItemWhereUniqueInput;
};
/**
 * StockroomItem deleteMany
 */
export type StockroomItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which StockroomItems to delete
     */
    where?: Prisma.StockroomItemWhereInput;
    /**
     * Limit how many StockroomItems to delete.
     */
    limit?: number;
};
/**
 * StockroomItem.adjustments
 */
export type StockroomItem$adjustmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InventoryAdjustment
     */
    select?: Prisma.InventoryAdjustmentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the InventoryAdjustment
     */
    omit?: Prisma.InventoryAdjustmentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InventoryAdjustmentInclude<ExtArgs> | null;
    where?: Prisma.InventoryAdjustmentWhereInput;
    orderBy?: Prisma.InventoryAdjustmentOrderByWithRelationInput | Prisma.InventoryAdjustmentOrderByWithRelationInput[];
    cursor?: Prisma.InventoryAdjustmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.InventoryAdjustmentScalarFieldEnum | Prisma.InventoryAdjustmentScalarFieldEnum[];
};
/**
 * StockroomItem without action
 */
export type StockroomItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockroomItem
     */
    select?: Prisma.StockroomItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StockroomItem
     */
    omit?: Prisma.StockroomItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StockroomItemInclude<ExtArgs> | null;
};
//# sourceMappingURL=StockroomItem.d.ts.map