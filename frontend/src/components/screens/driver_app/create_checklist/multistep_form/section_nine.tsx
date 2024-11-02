import React from 'react';
import FormWrapper from './wrapper';


interface ISectionNine {

    triangle: string;
    setTriangle: (event: React.ChangeEvent<HTMLInputElement>) => void;
    car_jack: string;
    setCarJack: (event: React.ChangeEvent<HTMLInputElement>) => void;
    spare_wheel: string;
    setSpareWheel: (event: React.ChangeEvent<HTMLInputElement>) => void;

}



const SectionNine: React.FC<ISectionNine> = ({ triangle, setTriangle, car_jack, setCarJack, spare_wheel, setSpareWheel }) => {
    return (
        <FormWrapper title='Accessories'>

            <div className="flex flex-col gap-2">
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Triangle:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="triangle"
                            checked={triangle === 'Fail'}
                            value="Fail"
                            onChange={setTriangle}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="triangle"
                            checked={triangle === 'Pass'}
                            value="Pass"
                            onChange={setTriangle}
                        /> Pass
                    </div>
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Car jack:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="car_jack"
                            checked={car_jack === 'Fail'}
                            value="Fail"
                            onChange={setCarJack}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="car_jack"
                            checked={car_jack === 'Pass'}
                            value="Pass"
                            onChange={setCarJack}
                        /> Pass
                    </div>
                </div>
                <div>
                    <label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3'>Spare wheel:</label>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="spare_wheel"
                            checked={spare_wheel === 'Fail'}
                            value="Fail"
                            onChange={setSpareWheel}
                        /> Fail
                    </div>
                    <div className="text-sm font-medium leading-none mb-2 text-gray-900">
                        <input
                            type="radio"
                            name="spare_wheel"
                            checked={spare_wheel === 'Pass'}
                            value="Pass"
                            onChange={setSpareWheel}
                        /> Pass
                    </div>
                </div>





            </div>


        </FormWrapper>
    )
}

export default SectionNine