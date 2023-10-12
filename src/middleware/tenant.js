exports.tenant = (req, res, next, db) => {
  // Get token from header
  const tenant_id = req.header("App-Tenant");
  console.log('tenant-id-->', tenant_id);
  // Check if tenant is available
  if (!tenant_id) {
    console.log('here at 1');
    return res
      .status(401)
      .json(
        new Response(401, "No App-Origin, authorization denied!").getResponse()
      );
  }

  try {
    // Add sequelize scope pattern to all models of tenant
    // Query teams table for App-Tenant and if valid, attach to request object.
    db.sequelize.options["tenant_id"] = tenant_id;
    db.sequelize.options["tenant_safe"] = false;
    
    req.tenant_id = tenant_id;
    next();
  } catch (err) {
    res
      .status(401)
      .json(
        new Response(
          401,
          "Invalid App-Origin, authorization denied!"
        ).getResponse()
      );
  }
};
