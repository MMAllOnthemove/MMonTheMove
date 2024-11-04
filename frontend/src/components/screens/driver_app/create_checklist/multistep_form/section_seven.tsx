import React from 'react';
import FormWrapper from './wrapper';
import { Input } from '@/components/ui/input';

interface ISectionSeven {

    next_service_date: string;
    setNextServiceDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
    cost_of_service: string;
    setCostOfService: (event: React.ChangeEvent<HTMLInputElement>) => void;


}



const SectionSeven: React.FC<ISectionSeven> = ({ next_service_date, setNextServiceDate, cost_of_service, setCostOfService }) => {
    return (
        <FormWrapper title='Vehicle service'>

            <div className="flex flex-col gap-2">
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Next service date:</label>
                    <div>
                        <Input
                            type="date"
                            name="next_service_date"
                            value={next_service_date}
                            onChange={setNextServiceDate}
                        />
                    </div>
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Cost of service:</label>
                    <div>
                        <Input
                            type="text"
                            inputMode='decimal'
                            name="cost_of_service"
                            value={cost_of_service}
                            onChange={setCostOfService}
                        />
                    </div>
                </div>

            </div>


        </FormWrapper>
    )
}

export default SectionSeven