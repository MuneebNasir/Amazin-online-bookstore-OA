package BookStore.Utils;

/**
 * The RequestResponse - Interface
 * @author Muneeb Nasir
 * @version 4806.1
 */

public class RequestResponse {

    private String status;
    private Object data;

    public RequestResponse(){

    }

    public RequestResponse(String status, Object data){
        this.status = status;
        this.data = data;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

}

