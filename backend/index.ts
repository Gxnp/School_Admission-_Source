import { zValidator } from "@hono/zod-validator";
import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";

const app = new Hono().basePath("/api");
const prisma = new PrismaClient();

app.use(cors());

app
  .post(
    "/application",
    zValidator(
      "form",
      z.object({
        title: z.string(),
        name: z.string(),
        nationalId: z.string(),
        dob: z.string(),
        age: z.string(),
        religion: z.string(),
        ethnicity: z.string(),
        nationality: z.string(),
        phone: z.string(),
        address: z.string(),
        previousSchool: z.string(),
        gpa: z.string(),
        gradeApplyingFor: z.string(),
        profilePicture: z.string(),
      })
    ),
    async (c) => {
      const {
        title,
        name,
        nationalId,
        dob,
        age,
        religion,
        ethnicity,
        nationality,
        phone,
        address,
        previousSchool,
        gpa,
        gradeApplyingFor,
        profilePicture,
      } = c.req.valid("form");

      try {
        const newApplication = await prisma.application.create({
          data: {
            title,
            name,
            nationalId,
            dob,
            age,
            religion,
            ethnicity,
            nationality,
            phone,
            address,
            previousSchool,
            gpa,
            gradeApplyingFor,
            profilePicture,
            status: "Passed",
          },
        });

        return c.json({ id: newApplication.id }, 201);
      } catch (error) {
        if (error instanceof Error) {
          return c.json({ error: error.message }, 500);
        }
        return c.json({ error: "An unexpected error occurred" }, 500);
      }
    }
  )
  .get(
    "/application/status/:nationalId",
    zValidator("param", z.object({ nationalId: z.string() })),
    async (c) => {
      const { nationalId } = c.req.valid("param");

      try {
        const data = await prisma.application.findUnique({
          where: {
            nationalId,
          },
        });

        if (!data) {
          return c.json({ status: "ไม่พบข้อมูลการสมัคร !" });
        }
        return c.json(data);
      } catch (error) {
        if (error instanceof Error) {
          return c.json({ error: error.message }, 500);
        }
        return c.json({ error: "An unexpected error occurred" }, 500);
      }
    }
  );
app.put(
  "/application/:nationalId", // เปลี่ยนจาก "/application" เป็น "/application/:nationalId"
  zValidator("param", z.object({ nationalId: z.string() })),
  async (c) => {
    const { nationalId } = c.req.valid("param");
    const updateData = await c.req.json();

    const schema = z.object({
      title: z.string().optional(),
      name: z.string().optional(),
      dob: z.string().optional(),
      age: z.string().optional(),
      religion: z.string().optional(),
      ethnicity: z.string().optional(),
      nationality: z.string().optional(),
      phone: z.string().optional(),
      address: z.string().optional(),
      previousSchool: z.string().optional(),
      gpa: z.string().optional(),
      gradeApplyingFor: z.string().optional(),
      profilePicture: z.string().optional(),
    });

    const validationResult = schema.safeParse(updateData);
    if (!validationResult.success) {
      return c.json(
        { error: "ข้อมูลไม่ถูกต้อง", details: validationResult.error },
        400
      );
    }

    try {
      const existingApplication = await prisma.application.findUnique({
        where: { nationalId },
      });

      if (!existingApplication) {
        return c.json({ error: "ไม่พบข้อมูลผู้สมัครนี้!" }, 404);
      }

      const updatedApplication = await prisma.application.update({
        where: { nationalId },
        data: {
          ...existingApplication, // ข้อมูลเดิม
          ...validationResult.data, // ข้อมูลใหม่ที่อัปเดต
        },
      });

      return c.json(updatedApplication);
    } catch (error) {
      return c.json({ error: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" }, 500);
    }
  }
);

export default app;
