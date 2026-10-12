import { ConflictError } from "@/shared/errors/conflict.error.js";
import { CustomerMapper } from "./mapper/customer.mapper.js";
import { NotFoundError } from "@/shared/errors/not-found.error.js";
export class CustomerService {
    customerRepository;
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async create(data) {
        if (data.gstNumber) {
            const existingCustomer = await this.customerRepository.getCustomerByGST(data.gstNumber);
            if (existingCustomer) {
                throw new ConflictError("A customer with this GST number already exists", "CONFLICT_ERROR");
            }
        }
        if (data.pan) {
            const existingCustomer = await this.customerRepository.getCustomerByPAN(data.pan);
            if (existingCustomer) {
                throw new ConflictError("A customer with this PAN number already exists", "CONFLICT_ERROR");
            }
        }
        const customerData = CustomerMapper.toPersistence(data);
        return await this.customerRepository.create(customerData);
    }
    async update(id, data) {
        const customer = await this.customerRepository.getCustomerById(id);
        if (!customer) {
            throw new NotFoundError("Customer not found");
        }
        if (data.gstNumber) {
            const existingCustomer = await this.customerRepository.getCustomerByGST(data.gstNumber);
            if (existingCustomer && existingCustomer.id !== id) {
                throw new ConflictError("A customer with this GST number already exists", "CONFLICT_ERROR");
            }
        }
        if (data.pan) {
            const existingCustomer = await this.customerRepository.getCustomerByPAN(data.pan);
            if (existingCustomer && existingCustomer.id !== id) {
                throw new ConflictError("A customer with this PAN number already exists", "CONFLICT_ERROR");
            }
        }
        return await this.customerRepository.update(id, CustomerMapper.toUpdatePersistence(data));
    }
    async getAll() {
        return await this.customerRepository.getAllCustomers();
    }
    async delete(id) {
        return await this.customerRepository.deactivateCustomer(id);
    }
    async getById(id, tx) {
        return await this.customerRepository.getCustomerById(id, tx);
    }
}
//# sourceMappingURL=customer.service.js.map