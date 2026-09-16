import { z } from "zod";
import Counter from "../components/Counter";

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.email(),
  address: z.object({
    street: z.string(),
    suite: z.string(),
    city: z.string(),
    zipcode: z.string(),
    geo: z.object({ lat: z.string(), lng: z.string() }),
  }),
  phone: z.string(),
  website: z.string(),
  company: z.object({
    name: z.string(),
    catchPhrase: z.string(),
    bs: z.string(),
  }),
});

const UserArraySchema = z.array(UserSchema);

type User = z.infer<typeof UserSchema>;

export default async function Page() {
  const result = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = UserArraySchema.parse(await result.json());

  return (
    <div>
      <h1>main/cabins</h1>
      <ul>
        {data.map((el) => (
          <li key={el.id}>{el.name}</li>
        ))}
      </ul>
      <Counter data={data} />
    </div>
  );
}
