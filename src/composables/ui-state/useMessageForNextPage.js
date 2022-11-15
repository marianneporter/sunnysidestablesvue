import { reactive } from 'vue'

const statusMessage = reactive({
    content: null,
    type: null
})

export default function useMessageForNextPage() { 

    const setMessage = (inMsg, msgType) =>  {
        statusMessage.content = inMsg
        statusMessage.type = msgType      
    }

    const clearStatusMessage = () => {
        statusMessage.content=null
        statusMessage.type=null            
    }

    return {
        setMessage,    
        statusMessage,
        clearStatusMessage
    }
}