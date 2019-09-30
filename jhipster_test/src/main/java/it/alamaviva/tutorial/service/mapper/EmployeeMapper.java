package it.alamaviva.tutorial.service.mapper;

import it.alamaviva.tutorial.domain.*;
import it.alamaviva.tutorial.service.dto.EmployeeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Employee} and its DTO {@link EmployeeDTO}.
 */
@Mapper(componentModel = "spring", uses = {DepartmentMapper.class})
public interface EmployeeMapper extends EntityMapper<EmployeeDTO, Employee> {


    @Mapping(target = "contacts", ignore = true)
    @Mapping(target = "removeContact", ignore = true)
    @Mapping(target = "removeDepartment", ignore = true)
    Employee toEntity(EmployeeDTO employeeDTO);

    default Employee fromId(Long id) {
        if (id == null) {
            return null;
        }
        Employee employee = new Employee();
        employee.setId(id);
        return employee;
    }
}
