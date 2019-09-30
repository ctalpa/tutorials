package it.alamaviva.tutorial.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import it.alamaviva.tutorial.domain.enumeration.Gender;

/**
 * The Employee entity.\n@author The Tiger team.
 */
@Entity
@Table(name = "employee")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * The firstname attribute.
     */
    @NotNull
    @Size(max = 50)
    @Column(name = "first_name", length = 50, nullable = false)
    private String firstName;

    @NotNull
    @Size(max = 50)
    @Column(name = "last_name", length = 50, nullable = false)
    private String lastName;

    @Column(name = "id_number")
    private String idNumber;

    @Column(name = "birthday")
    private Long birthday;

    @Column(name = "hire_date")
    private Instant hireDate;

    @Column(name = "termination_date")
    private Instant terminationDate;

    @Column(name = "level")
    private Integer level;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender")
    private Gender gender;

    @OneToMany(mappedBy = "employee")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Contact> contacts = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "employee_department",
               joinColumns = @JoinColumn(name = "employee_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "department_id", referencedColumnName = "id"))
    private Set<Department> departments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Employee firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Employee lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public Employee idNumber(String idNumber) {
        this.idNumber = idNumber;
        return this;
    }

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public Long getBirthday() {
        return birthday;
    }

    public Employee birthday(Long birthday) {
        this.birthday = birthday;
        return this;
    }

    public void setBirthday(Long birthday) {
        this.birthday = birthday;
    }

    public Instant getHireDate() {
        return hireDate;
    }

    public Employee hireDate(Instant hireDate) {
        this.hireDate = hireDate;
        return this;
    }

    public void setHireDate(Instant hireDate) {
        this.hireDate = hireDate;
    }

    public Instant getTerminationDate() {
        return terminationDate;
    }

    public Employee terminationDate(Instant terminationDate) {
        this.terminationDate = terminationDate;
        return this;
    }

    public void setTerminationDate(Instant terminationDate) {
        this.terminationDate = terminationDate;
    }

    public Integer getLevel() {
        return level;
    }

    public Employee level(Integer level) {
        this.level = level;
        return this;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Gender getGender() {
        return gender;
    }

    public Employee gender(Gender gender) {
        this.gender = gender;
        return this;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Set<Contact> getContacts() {
        return contacts;
    }

    public Employee contacts(Set<Contact> contacts) {
        this.contacts = contacts;
        return this;
    }

    public Employee addContact(Contact contact) {
        this.contacts.add(contact);
        contact.setEmployee(this);
        return this;
    }

    public Employee removeContact(Contact contact) {
        this.contacts.remove(contact);
        contact.setEmployee(null);
        return this;
    }

    public void setContacts(Set<Contact> contacts) {
        this.contacts = contacts;
    }

    public Set<Department> getDepartments() {
        return departments;
    }

    public Employee departments(Set<Department> departments) {
        this.departments = departments;
        return this;
    }

    public Employee addDepartment(Department department) {
        this.departments.add(department);
        department.getEmployees().add(this);
        return this;
    }

    public Employee removeDepartment(Department department) {
        this.departments.remove(department);
        department.getEmployees().remove(this);
        return this;
    }

    public void setDepartments(Set<Department> departments) {
        this.departments = departments;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Employee)) {
            return false;
        }
        return id != null && id.equals(((Employee) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Employee{" +
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
