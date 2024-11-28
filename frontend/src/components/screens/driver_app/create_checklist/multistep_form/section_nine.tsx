import { Textarea } from '@/components/ui/textarea';
import React, { ChangeEvent } from 'react';
import FormWrapper from './wrapper';

interface ISectionNine {

    hass: string;
    setHass: (event: React.ChangeEvent<HTMLInputElement>) => void;
    hass_fail_reason: string;
    setHassFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    tools: string;
    setTools: (event: React.ChangeEvent<HTMLInputElement>) => void;
    tools_fail_reason: string;
    setToolsFailReason: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;

}



const SectionNine: React.FC<ISectionNine> = ({ hass, setHass, hass_fail_reason, setHassFailReason, tools, setTools, tools_fail_reason, setToolsFailReason}) => {
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


                
            </div>


        </FormWrapper>
    )
}

export default SectionNine