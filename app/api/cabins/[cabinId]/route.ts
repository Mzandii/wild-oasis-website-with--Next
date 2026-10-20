import { NextRequest } from "next/server";
import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

type RouteParams = {
  params: Promise<{ cabinId: string }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { cabinId } = await params;
  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(Number(cabinId)),
      getBookedDatesByCabinId(Number(cabinId)),
    ]);
    if (!cabin || !bookedDates) {
      return Response.json(
        { message: "Cabin/bookedDates not found" },
        { status: 404 },
      );
    }
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" }, { status: 404 });
  }
}
