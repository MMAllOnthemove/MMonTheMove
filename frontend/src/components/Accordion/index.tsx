interface IAccordion {
  defaultIndex: string | number;
  onItemClick: (data: string | number) => void;
  children: React.ReactNode | string | any;
}
interface IAccordionItem {
  label: string | number;
  isCollapsed: any;
  handleClick: () => void;
  children: React.ReactNode;
}

const AccordionItem = ({
  label,
  isCollapsed,
  handleClick,
  children,
}: IAccordionItem) => {
  return (
    <>
      <button className="accordion-button" onClick={handleClick}>
        {label}
      </button>
      <div
        className={`accordion-item bg-sky-800 ${
          isCollapsed ? "collapsed" : "expanded"
        }`}
        aria-expanded={isCollapsed}
      >
        {children}
      </div>
    </>
  );
};

const Accordion = ({ defaultIndex, onItemClick, children }: IAccordion) => {
  const [bindIndex, setBindIndex] = React.useState(defaultIndex);

  const changeItem = (itemIndex: string | number) => {
    if (typeof onItemClick === "function") onItemClick(itemIndex);
    if (itemIndex !== bindIndex) setBindIndex(itemIndex);
  };
  const items = children.filter(
    (item: any) => item.type.name === "AccordionItem"
  );

  return (
    <>
      {items.map(
        ({
          index,
          label,
          children,
        }: {
          index: string | number;
          label: string | number;
          children: React.ReactNode | any;
        }) => (
          <AccordionItem
            isCollapsed={bindIndex !== index}
            label={label}
            handleClick={() => changeItem(index)}
            children={children}
          />
        )
      )}
    </>
  );
};

//   Use:
{
  /* <Accordion defaultIndex="1" onItemClick={console.log}>
  <AccordionItem label="A" index="1">
    Lorem ipsum
  </AccordionItem>
  <AccordionItem label="B" index="2">
    Dolor sit amet
  </AccordionItem>
</Accordion>; */
}
