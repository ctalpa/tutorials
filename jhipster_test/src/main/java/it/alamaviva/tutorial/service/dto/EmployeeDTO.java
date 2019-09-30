package it.alamaviva.tutorial.service.dto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import it.alamaviva.tutorial.domain.enumeration.Gender;

/**
 * A DTO for the {@link it.alamaviva.tutorial.domain.Employee} entity.
 */
@ApiModel(description = "The Employee entity.\n@author The Tiger team.")
public class EmployeeDTO implements Serializable {

    private Long id;

    /**
     * The firstname attribute.
     */
    @NotNull
    @Size(max = 50)
    @ApiModelProperty(value = "The firstname attribute.", required = true)
    private String firstName;

    @NotNull
    @Size(max = 50)
    private String lastName;

    private String idNumber;

    private Long birthday;

    private Instant hireDate;

    private Instant terminationDate;

    private Integer level;

    private Gender gender;


    private Set<DepartmentDTO> departments = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public Long getBirthday() {
        return birthday;
    }

    public void setBirthday(Long birthday) {
        this.birthday = birthday;
    }

    public Instant getHireDate() {
        return hireDate;
    }

    public void setHireDate(Instant hireDate) {
        this.hireDate = hireDate;
    }

    public Instant getTerminationDate() {
        return terminationDate;
    }

    public void setTerminationDate(Instant terminationDate) {
        this.terminationDate = terminationDate;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Set<DepartmentDTO> getDepartments() {
        return departments;
    }

    public void setDepartments(Set<DepartmentDTO> departments) {
        this.departments = departments;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EmployeeDTO employeeDTO = (EmployeeDTO) o;
        if (employeeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), employeeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EmployeeDTO{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", idNumber='" + getIdNumber() + "'" +
            ", birthday=" + getBirthday() +
            ", hireDate='" + getHireDate() + "'" +
            ", terminationDate='" + getTerminationDate() + "'" +
            ", level=" + getLevel() +
            ", gender='" + getGender() + "'" +
            "}";
    }
}
