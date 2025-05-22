package store.oneul.mvc.security.common;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;

public class CustomHeaderRequestWrapper extends HttpServletRequestWrapper {
    private final String newAccessToken;

    public CustomHeaderRequestWrapper(HttpServletRequest request, String newAccessToken) {
        super(request);
        this.newAccessToken = newAccessToken;
    }

    @Override
    public String getHeader(String name) {
        if ("Authorization".equalsIgnoreCase(name)) {
            return "Bearer " + newAccessToken;
        }
        return super.getHeader(name);
    }
}