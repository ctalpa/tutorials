package it.alamaviva.tutorial.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link it.alamaviva.tutorial.domain.Contact} entity.
 */
public class ContactDTO implements Serializable {

    private Long id;

    private String value;

    private Boolean contactCompany;


    private Long contactTypeId;

    private Long employeeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Boolean isContactCompany() {
        return contactCompany;
    }

    public void setContactCompany(Boolean contactCompany) {
        this.contactCompany = contactCompany;
    }

    public Long getContactTypeId() {
        return contactTypeId;
    }

    public void setContactTypeId(Long contactTypeId) {
        this.contactTypeId = contactTypeId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ContactDTO contactDTO = (ContactDTO) o;
        if (contactDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contactDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ContactDTO{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", contactCompany='" + isContactCompany() + "'" +
            ", contactType=" + getContactTypeId() +
            ", employee=" + getEmployeeId() +
            "}";
    }
}
