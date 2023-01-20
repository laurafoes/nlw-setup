import * as Popover from '@radix-ui/react-popover'

interface ProgressBarProps {
    progress: number
}

function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
            <div 
                className="h-3 rounded-xl bg-violet-600 w-3/4" 
                role="progressbar"
                aria-aria-valuenow={progress}
                style={{ width: `${progress}%` }}
            />
                    
        </div>
    )
}

export default ProgressBar
