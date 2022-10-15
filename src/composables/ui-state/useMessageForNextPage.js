const statusMessage = {
    content: null,
    type: null
}

export default function useMessageForNextPage() { 

    const setMessage = (inMsg, msgType) =>  {
        statusMessage.content = inMsg
        statusMessage.type = msgType
    }
   
    const getMessage = () => {

        if (!statusMessage.content) {
            return null
        }

        let msgToReturn = { ...statusMessage }

        statusMessage.content=null
        statusMessage.type=null       
      
        return msgToReturn      
    } 

    return {
        setMessage,
        getMessage
    }
}