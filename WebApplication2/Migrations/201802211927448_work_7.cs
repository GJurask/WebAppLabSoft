namespace WebApplication2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class work_7 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.SampleType",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Identification = c.String(),
                        EditionDateTime = c.DateTime(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.SampleType");
        }
    }
}
