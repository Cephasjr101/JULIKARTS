import {
  mysqlTable,
  mysqlEnum,
  serial,
  bigint,
  varchar,
  int,
  timestamp,
} from "drizzle-orm/mysql-core";

export const orders = mysqlTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("order_number", { length: 20 }).notNull().unique(),
  customerName: varchar("customer_name", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  fulfillment: mysqlEnum("fulfillment", ["delivery", "pickup"]).notNull(),
  address: varchar("address", { length: 300 }),
  notes: varchar("notes", { length: 500 }),
  totalPesewas: int("total_pesewas").notNull(),
  status: mysqlEnum("status", ["received", "preparing", "ready", "completed", "cancelled"])
    .notNull()
    .default("received"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orderItems = mysqlTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: bigint("order_id", { mode: "number", unsigned: true }).notNull(),
  catalogId: varchar("catalog_id", { length: 64 }).notNull(),
  name: varchar("name", { length: 160 }).notNull(),
  unitPricePesewas: int("unit_price_pesewas").notNull(),
  quantity: int("quantity").notNull(),
});

export const reservations = mysqlTable("reservations", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 20 }).notNull().unique(),
  type: mysqlEnum("type", ["room", "table"]).notNull(),
  roomId: varchar("room_id", { length: 64 }),
  name: varchar("name", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  email: varchar("email", { length: 160 }),
  checkIn: varchar("check_in", { length: 10 }),
  checkOut: varchar("check_out", { length: 10 }),
  date: varchar("date", { length: 10 }),
  time: varchar("time", { length: 5 }),
  guests: int("guests").notNull(),
  nights: int("nights"),
  totalPesewas: int("total_pesewas"),
  notes: varchar("notes", { length: 500 }),
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled"]).notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const pageViews = mysqlTable("page_views", {
  id: serial("id").primaryKey(),
  path: varchar("path", { length: 200 }).notNull(),
  referrer: varchar("referrer", { length: 300 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
