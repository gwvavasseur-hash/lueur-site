import { supabase } from "../lib/supabase";

function assertSupabase() {
  if (!supabase) {
    throw new Error("Supabase n'est pas configuré.");
  }
}

function mapFragment(row) {
  return {
    id: row.fragment_id,
    text: row.text,
    bookId: row.book_id,
    mood: row.mood,
  };
}

function mapReflection(row) {
  return {
    id: row.local_id,
    book: row.book,
    question: row.question,
    answer: row.answer,
  };
}

function mapAction(row) {
  return {
    id: row.local_id,
    book: row.book,
    text: row.text,
    status: row.status,
  };
}

function mapCartItem(row) {
  return {
    id: row.item_id,
    category: row.category,
    title: row.title,
    price: row.price,
    type: row.type,
  };
}

async function throwIfError(result) {
  if (result.error) {
    throw result.error;
  }
  return result.data;
}

export async function loadMemberData(userId) {
  assertSupabase();

  const [fragmentsResult, reflectionsResult, actionsResult, cartResult] = await Promise.all([
    supabase.from("saved_fragments").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    supabase.from("saved_reflections").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    supabase.from("saved_actions").select("*").eq("user_id", userId).order("created_at", { ascending: false }),
    supabase.from("cart_items").select("*").eq("user_id", userId).order("created_at", { ascending: true }),
  ]);

  const savedFragments = await throwIfError(fragmentsResult);
  const savedReflections = await throwIfError(reflectionsResult);
  const savedActions = await throwIfError(actionsResult);
  const cartItems = await throwIfError(cartResult);

  return {
    savedFragments: savedFragments.map(mapFragment),
    savedReflections: savedReflections.map(mapReflection),
    savedActions: savedActions.map(mapAction),
    cartItems: cartItems.map(mapCartItem),
  };
}

export async function upsertSavedFragment(userId, fragment) {
  assertSupabase();

  return throwIfError(
    await supabase.from("saved_fragments").upsert(
      {
        user_id: userId,
        fragment_id: fragment.id,
        book_id: fragment.bookId,
        text: fragment.text,
        mood: fragment.mood,
      },
      { onConflict: "user_id,fragment_id" },
    ),
  );
}

export async function insertSavedReflection(userId, reflection) {
  assertSupabase();

  return throwIfError(
    await supabase.from("saved_reflections").upsert(
      {
        user_id: userId,
        local_id: reflection.id,
        book: reflection.book,
        question: reflection.question,
        answer: reflection.answer,
      },
      { onConflict: "user_id,local_id" },
    ),
  );
}

export async function insertSavedAction(userId, action) {
  assertSupabase();

  return throwIfError(
    await supabase.rpc("save_member_action", {
      p_local_id: action.id,
      p_book: action.book,
      p_text: action.text,
      p_status: action.status,
    }),
  );
}

export async function upsertCartItem(userId, item) {
  assertSupabase();

  return throwIfError(
    await supabase.rpc("save_cart_item", {
      p_item_id: item.id,
      p_category: item.category,
      p_title: item.title,
      p_price: item.price,
      p_type: item.type,
    }),
  );
}

export async function deleteCartItem(userId, id, category) {
  assertSupabase();

  return throwIfError(
    await supabase.rpc("delete_cart_item", {
      p_item_id: id,
      p_category: category,
    }),
  );
}

export async function syncGuestData(userId, { savedFragments, savedReflections, savedActions, cartItems }) {
  assertSupabase();

  await Promise.all([
    ...savedFragments.map((fragment) => upsertSavedFragment(userId, fragment)),
    ...savedReflections.map((reflection) => insertSavedReflection(userId, reflection)),
    ...savedActions.map((action) => insertSavedAction(userId, action)),
    ...cartItems.map((item) => upsertCartItem(userId, item)),
  ]);
}
