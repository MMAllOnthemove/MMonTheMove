import { Textarea } from '@/components/ui/textarea';
import React, { ChangeEvent } from 'react';
import FormWrapper from './wrapper';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface ISectionNine {

    hass: string;
    setHass: (event: React.ChangeEvent<HTMLInputElement>) => void;
    hass_fail_reason: string;
    setHassFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    tools: string;
    setTools: (event: React.ChangeEvent<HTMLInputElement>) => void;
    tools_fail_reason: string;
    setToolsFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

    checklist_FilesLoadingProp: boolean;
    setChecklistFilesProp: (data: ChangeEvent<HTMLInputElement>) => void;
    submitChecklistFiles: (data: React.SyntheticEvent) => void;
}



const SectionNine: React.FC<ISectionNine> = ({ hass, setHass, hass_fail_reason, setHassFailReason, tools, setTools, tools_fail_reason, setToolsFailReason, checklist_FilesLoadingProp, setChecklistFilesProp, submitChecklistFiles }) => {
    return (
        <FormWrapper title='Accessories & attachments'>

            <div className="flex flex-col gap-2">
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Hass:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="hass"
                            checked={hass === 'Fail'}
                            value="Fail"
                            onChange={setHass}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="hass"
                            checked={hass === 'Pass'}
                            value="Pass"
                            onChange={setHass}
                        /> Pass
                    </div>
                    {
                        hass === 'Fail' ? <div>
                            <Textarea placeholder="Reason for hass check failing." value={hass_fail_reason} onChange={setHassFailReason} />
                        </div> : null
                    }
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Handy tools:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="tools"
                            checked={tools === 'Fail'}
                            value="Fail"
                            onChange={setTools}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="tools"
                            checked={tools === 'Pass'}
                            value="Pass"
                            onChange={setTools}
                        /> Pass
                    </div>
                    {
                        tools === 'Fail' ? <div>
                            <Textarea placeholder="Reason for tools check failing." value={tools_fail_reason} onChange={setToolsFailReason} />
                        </div> : null
                    }
                </div>


                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Attachments</AccordionTrigger>
                        <AccordionContent>
                            <div className="flex items-center">
                                <Input type="file" multiple className="my-3" onChange={setChecklistFilesProp} />
                                <Button className="ml-3" disabled={checklist_FilesLoadingProp} onClick={submitChecklistFiles}>{checklist_FilesLoadingProp ? 'Uploading' : 'Attach'}</Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>


        </FormWrapper>
    )
}

export default SectionNine