"use client";

import { useState } from "react";
import Link from "next/link";
import { InboxBoard } from "@/components/inbox-board";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { menuListClass, menuTriggerClass } from "@/components/menu-bar";
import { Field, controlClass } from "@/components/page-title";
import { resourceCategories, type Article } from "@/data/demo";
import { useDemo } from "@/lib/demo-store";

export function WebsiteDesk() {
  return (
    <Tabs defaultValue="enquiries" className="pb-20">
      <div className="border-b border-border px-4">
        <TabsList className={menuListClass}>
          <TabsTrigger value="enquiries" className={menuTriggerClass}>Enquiries</TabsTrigger>
          <TabsTrigger value="articles" className={menuTriggerClass}>Articles</TabsTrigger>
          <TabsTrigger value="events" className={menuTriggerClass}>Events</TabsTrigger>
        </TabsList>
      </div>
      <div className="mx-auto w-full max-w-3xl px-5 pt-6">
        <TabsContent value="enquiries">
          <InboxBoard />
        </TabsContent>
        <TabsContent value="articles">
          <ArticleDesk />
        </TabsContent>
        <TabsContent value="events">
          <EventDesk />
        </TabsContent>
      </div>
    </Tabs>
  );
}

function ArticleDesk() {
  const { state, addArticle, removeArticle } = useDemo();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Article["category"]>("USMLE 101");
  const [dek, setDek] = useState("");
  const [body, setBody] = useState("");
  const [notice, setNotice] = useState("");

  function publish(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim() || !body.trim()) {
      setNotice("A piece needs a title and some text.");
      return;
    }
    const slug = addArticle({ title, category, dek: dek.trim() || title.trim(), body });
    setTitle("");
    setDek("");
    setBody("");
    setNotice("Published.");
    return slug;
  }

  return (
    <div className="grid gap-8">
      <form onSubmit={publish} className="grid gap-4 border border-border bg-card/80 p-5">
        <h2 className="text-xl">Publish a piece</h2>
        <Field label="Title">
          <Input className="h-10" value={title} onChange={(event) => setTitle(event.target.value)} />
        </Field>
        <Field label="Shelf">
          <select className={controlClass} value={category} onChange={(event) => setCategory(event.target.value as Article["category"])}>
            {resourceCategories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </Field>
        <Field label="One-line summary">
          <Input className="h-10" value={dek} onChange={(event) => setDek(event.target.value)} />
        </Field>
        <Field label="Text" hint="Leave a blank line between paragraphs.">
          <Textarea rows={8} value={body} onChange={(event) => setBody(event.target.value)} />
        </Field>
        <Button type="submit" className="h-10 w-fit px-4">Publish</Button>
        {notice ? <p className="text-sm text-muted-foreground">{notice}</p> : null}
      </form>
      <ul className="grid gap-3">
        {state.articles.map((article) => (
          <li key={article.slug} className="flex flex-wrap items-center justify-between gap-3 border border-border bg-card/80 p-4">
            <div>
              <p className="text-xs tracking-[0.14em] text-primary uppercase">{article.category}</p>
              <Link href={`/resources/${article.slug}`} className="font-medium underline-offset-4 hover:underline">
                {article.title}
              </Link>
            </div>
            <Button variant="outline" className="h-8" onClick={() => removeArticle(article.slug)}>
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EventDesk() {
  const { state, addEvent, removeEvent } = useDemo();
  const [title, setTitle] = useState("");
  const [when, setWhen] = useState("");
  const [time, setTime] = useState("");
  const [where, setWhere] = useState("");
  const [audience, setAudience] = useState("");
  const [detail, setDetail] = useState("");
  const [notice, setNotice] = useState("");

  function publish(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim() || !when.trim() || !where.trim() || !detail.trim()) {
      setNotice("A session needs a title, a date, a place, and a description.");
      return;
    }
    addEvent({
      title,
      when,
      time: time.trim() || "Time to be confirmed",
      where,
      audience: audience.trim() || "For students and parents.",
      detail,
    });
    setTitle("");
    setWhen("");
    setTime("");
    setWhere("");
    setAudience("");
    setDetail("");
    setNotice("Added to the events page.");
  }

  return (
    <div className="grid gap-8">
      <form onSubmit={publish} className="grid gap-4 border border-border bg-card/80 p-5">
        <h2 className="text-xl">Add a session</h2>
        <Field label="Title">
          <Input className="h-10" value={title} onChange={(event) => setTitle(event.target.value)} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Date">
            <Input className="h-10" value={when} onChange={(event) => setWhen(event.target.value)} placeholder="Saturday, 4 April 2027" />
          </Field>
          <Field label="Time">
            <Input className="h-10" value={time} onChange={(event) => setTime(event.target.value)} placeholder="10:00–12:00 IST" />
          </Field>
        </div>
        <Field label="Place">
          <Input className="h-10" value={where} onChange={(event) => setWhere(event.target.value)} placeholder="Hyderabad or Online" />
        </Field>
        <Field label="Who it is for">
          <Input className="h-10" value={audience} onChange={(event) => setAudience(event.target.value)} placeholder="For students starting Step 1." />
        </Field>
        <Field label="What happens">
          <Textarea rows={4} value={detail} onChange={(event) => setDetail(event.target.value)} />
        </Field>
        <Button type="submit" className="h-10 w-fit px-4">Add session</Button>
        {notice ? <p className="text-sm text-muted-foreground">{notice}</p> : null}
      </form>
      <ul className="grid gap-3">
        {state.events.map((event) => (
          <li key={event.id} className="flex flex-wrap items-center justify-between gap-3 border border-border bg-card/80 p-4">
            <div>
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-muted-foreground">{event.when} · {event.where}</p>
            </div>
            <Button variant="outline" className="h-8" onClick={() => removeEvent(event.id)}>
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
