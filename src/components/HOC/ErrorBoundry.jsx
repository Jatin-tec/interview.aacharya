import React from 'react';
import { useToast } from "@/components/ui/use-toast"

const withErrorBoundary = (WrappedComponent) => {
    const { toasts } = useToast()

    return (props) => {
        const { error } = props;
        if (error) {
            toasts.error({
                title: "Error",
                description: error.message
            });
        }
        return <WrappedComponent {...props} />;
    };
};

export default withErrorBoundary;
