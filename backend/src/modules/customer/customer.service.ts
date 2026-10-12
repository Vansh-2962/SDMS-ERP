import type { Customer, Prisma } from "@/generated/prisma/client.js";
import type { CustomerRepository } from "./customer.repository.js";
import type { CreateCustomerDto } from "./dto/customer.dto.js";
import { ConflictError } from "@/shared/errors/conflict.error.js";
import { CustomerMapper } from "./mapper/customer.mapper.js";
import { NotFoundError } from "@/shared/errors/not-found.error.js";
import type { UpdateCustomerInput } from "./validators/customer.validator.js";

export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(data: CreateCustomerDto["body"]): Promise<Customer> {
    if (data.gstNumber) {
      const existingCustomer = await this.customerRepository.getCustomerByGST(
        data.gstNumber,
      );

      if (existingCustomer) {
        throw new ConflictError(
          "A customer with this GST number already exists",
          "CONFLICT_ERROR",
        );
      }
    }

    if (data.pan) {
      const existingCustomer = await this.customerRepository.getCustomerByPAN(
        data.pan,
      );

      if (existingCustomer) {
        throw new ConflictError(
          "A customer with this PAN number already exists",
          "CONFLICT_ERROR",
        );
      }
    }

    const customerData = CustomerMapper.toPersistence(data);

    return await this.customerRepository.create(customerData);
  }

  async update(
    id: string,
    data: UpdateCustomerInput["body"],
  ): Promise<Customer> {
    const customer = await this.customerRepository.getCustomerById(id);
    if (!customer) {
      throw new NotFoundError("Customer not found");
    }

    if (data.gstNumber) {
      const existingCustomer = await this.customerRepository.getCustomerByGST(
        data.gstNumber,
      );

      if (existingCustomer && existingCustomer.id !== id) {
        throw new ConflictError(
          "A customer with this GST number already exists",
          "CONFLICT_ERROR",
        );
      }
    }

    if (data.pan) {
      const existingCustomer = await this.customerRepository.getCustomerByPAN(
        data.pan,
      );

      if (existingCustomer && existingCustomer.id !== id) {
        throw new ConflictError(
          "A customer with this PAN number already exists",
          "CONFLICT_ERROR",
        );
      }
    }

    return await this.customerRepository.update(
      id,
      CustomerMapper.toUpdatePersistence(data),
    );
  }

  async getAll(): Promise<Customer[] | null> {
    return await this.customerRepository.getAllCustomers();
  }

  async delete(id: string): Promise<Customer | null> {
    return await this.customerRepository.deactivateCustomer(id);
  }

  async getById(
    id: string,
    tx?: Prisma.TransactionClient,
  ): Promise<Customer | null> {
    return await this.customerRepository.getCustomerById(id, tx);
  }
}
