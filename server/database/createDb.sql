CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(255) NOT NULL,
  "password" VARCHAR(255) NOT NULL
);
CREATE TABLE "triangles" (
  "id" SERIAL PRIMARY KEY,
  "nickname" VARCHAR(255),
  "type_by_side" VARCHAR(255),
  "type_by_angle" VARCHAR(255),
  "angle_a" REAL,
  "angle_b" REAL,
  "angle_c" REAL,
  "triangle_image" BYTEA NOT NULL,
  "user_id" INT NOT NULL
);

ALTER TABLE "triangles" ADD CONSTRAINT "triangles_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");


