"use client"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import useGetUserListRepairshopr from "@/hooks/useGetUsersListRepairshopr";
import useSignup from "@/hooks/useSignup";
import { datetimestamp } from "@/lib/date_formats";
import { useState } from "react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CheckIcon, ChevronUpDownIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
const SignupScreen = () => {
    const { rsUsersList } = useGetUserListRepairshopr()




    const formattedData = rsUsersList?.map((user) => ({
        repairshopr_id: user[0],
        value: user[1],
        label: user[1]
    }))

    const [open, setOpen] = useState(false)

    const { signup, loading, errors } = useSignup()


    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [repairshopr_id, setUserId] = useState<number | null>(null); // To store the selected repairshopr user ID
    const [password, setPassword] = useState("")
    const [passwordShown, setPasswordShown] = useState(false);

    // Password toggle handler
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const signupUser = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const createdAt = datetimestamp;
        const payload = { fullName, email, repairshopr_id, password, createdAt };
        await signup(payload);
        // console.log(repairshopr_id);

    }
    return (

        <form>
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">Create account</CardTitle>

                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="fullName">Full name</Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full justify-between"
                                >
                                    {fullName
                                        ? formattedData?.find((framework) => framework.value === fullName)?.label
                                        : "Select your name..."}
                                    <ChevronUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="Search your name..." className="h-9" />
                                    <CommandList>
                                        <CommandEmpty>No user found.</CommandEmpty>
                                        <CommandGroup>
                                            {formattedData?.map((framework) => (
                                                <CommandItem

                                                    key={framework.value}
                                                    value={framework.value}
                                                    onSelect={(currentValue) => {
                                                        setFullName(currentValue === fullName ? "" : currentValue)
                                                        setUserId(framework?.repairshopr_id); // Store the corresponding repairshopr ID
                                                        setOpen(false)
                                                    }}
                                                >
                                                    {framework.label}
                                                    <CheckIcon
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            fullName === framework.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        {errors.fullName && <p className="text-sm text-red-500 font-medium">{errors.fullName}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            className="bg-white border border-gray-300 outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 shadow-sm"
                        />
                        {errors.email && <p className="text-sm text-red-500 font-medium">{errors.email}</p>}
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <div className="flex items-center gap-2 border border-gray-300 mb-2 pr-1 rounded-sm">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                className="bg-white outline-0 text-gray-900 text-sm rounded-sm focus:ring-[#131515] focus:border-[#131515] block w-full px-3 py-1 outline-none shadow-none"
                                type={passwordShown ? "text" : "password"}
                            />

                            <Button
                                type="button"
                                onClick={togglePassword}
                                className="bg-transparent border-none outline-none shadow-none hover:bg-transparent"
                            >
                                <span>
                                    {!passwordShown ? (
                                        <EyeIcon className="w-6 h-6 text-gray-600" />
                                    ) : (
                                        <EyeSlashIcon className="w-6 h-6 text-gray-600" />
                                    )}
                                </span>
                            </Button>
                        </div>
                        {errors.password && <p className="text-sm text-red-500 font-medium">{errors.password}</p>}
                    </div>


                </CardContent>
                <CardFooter>
                    <Button className="w-full outline-none" type="submit" disabled={loading} onClick={signupUser}>{loading ? 'Signing up...' : 'Continue'}</Button>
                </CardFooter>
            </Card>
        </form>

    )
}
export default SignupScreen