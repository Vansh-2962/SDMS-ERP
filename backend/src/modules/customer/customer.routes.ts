import { validate } from "@/middlewares/validate.middleware.js"
import { Router } from "express"
import { customerSchema } from "./validators/customer.validator.js"
import { authenticate } from "@/middlewares/authenticate.middleware.js"
import { asyncHandler } from "@/middlewares/asyncHandler.middleware.js"
import { CustomerRepository } from "@/modules/customer/customer.repository.js"
import { CustomerController } from "@/modules/customer/customer.controller.js"
import { CustomerService } from "@/modules/customer/customer.service.js"
import { prisma } from "@/config/database/prisma.js"


const customerRouter: Router = Router()

const customerRepository = new CustomerRepository(prisma)
const customerService = new CustomerService(customerRepository)
const customerConstroller = new CustomerController(customerService)

customerRouter.post("/", authenticate, validate(customerSchema), asyncHandler(customerConstroller.create))

export { customerRouter }