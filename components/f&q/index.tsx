import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FandQ() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto shadow-2xl p-8 rounded-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger className='text-left'>
          What is VAKAKS stater kit?
        </AccordionTrigger>
        <AccordionContent>
          <strong>VAKAKS</strong> is a starter kit that comes with Next.js,
          Tailwind CSS, ShadCn, TypeScript and Firebase. It&apos;s designed to
          help you build your projects
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className='text-left'>
          The kit comes with Firebase already configured, both Sever and Client?
        </AccordionTrigger>
        <AccordionContent>
          Yes. The kit comes with Firebase already configured. You just need to
          add your environment variables.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className='text-left'>
          How do I add environment variables to the project?
        </AccordionTrigger>
        <AccordionContent>
          You can add your environment variables to the .env file in the
          root of the project.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
