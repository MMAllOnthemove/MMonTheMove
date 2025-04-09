import { IPageTitle } from "@/lib/interfaces";

const PageTitle = ({ hasSpan, title, spanText }: IPageTitle) => {
    return (
        <>
            <h1 className="mb-4 text-3xl font-semibold text-gray-900 md:text-5xl lg:text-6xl text-center pt-5">
                {hasSpan === true ? (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mr-3">
                        {spanText}
                    </span>
                ) : (
                    ""
                )}
                {title}
            </h1>
        </>
    );
};
export default PageTitle;
